import type { FileProperties } from "jsforce/api/metadata";

const BROKEN_TYPES = ["CustomMetadata", "Layout", "QuickAction"];

export function addMissingNamespace(
  fileProperties: Array<FileProperties>
): Array<FileProperties> {
  return fileProperties.map((fileProperty) => {
    if (
      fileProperty.manageableState === "installed" &&
      fileProperty.namespacePrefix &&
      BROKEN_TYPES.includes(fileProperty.type)
    ) {
      // https://gearset.com/blog/retrieving-and-deploying-namespaced-layouts-in-salesforce
      // The namespace prefix seems to be missing for the component names (not for CustomObject names) -> last part
      let separator = ".";
      if (fileProperty.type === "Layout") {
        separator = "-";
      }
      // split only once
      const tmpCmdFullNameParts = fileProperty.fullName.split(separator);
      const cmpFullNameParts = tmpCmdFullNameParts.slice(0, 1);
      if (tmpCmdFullNameParts.length > 1) {
        cmpFullNameParts.push(
          tmpCmdFullNameParts
            .slice(1, tmpCmdFullNameParts.length)
            .join(separator)
        );
      }
      const fixedCmpFullName = cmpFullNameParts
        .map(function (part, index, array) {
          if (
            index === array.length - 1 &&
            part.indexOf(fileProperty.namespacePrefix + "__") !== 0
          ) {
            return fileProperty.namespacePrefix + "__" + part;
          }
          return part;
        })
        .join(separator);
      if (fixedCmpFullName !== fileProperty.fullName) {
        const directory = fileProperty.fileName.split("/")[0];
        const fileNameDotParts = fileProperty.fileName.split(".");
        const extension = fileNameDotParts[fileNameDotParts.length - 1];
        fileProperty.fileName =
          [directory, fixedCmpFullName].join("/") + "." + extension;
        fileProperty.fullName = fixedCmpFullName;
      }
    }
    return fileProperty;
  });
}
