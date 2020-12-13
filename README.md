# listmetadata-installed-missing-namespaceprefix

> Minimal working example to demonstrate a bug in listMetadata where installed components of some metadata types are not prefixed with the namespace

[![Actions Status](https://github.com/mdapi-issues/listmetadata-installed-missing-namespaceprefix/workflows/Test%20and%20Release/badge.svg)](https://github.com/mdapi-issues/listmetadata-installed-missing-namespaceprefix/actions)

**Affected metadata types**:

- `CustomMetadata`
- `Layout`
- `QuickAction`

## Steps to reproduce the issue

Create a scratch org

```console
sfdx force:org:create -f config/project-scratch-def.json -s
```

install a dummy managed package containing a `Layout` on the CustomObject `Vehicle__c`

```console
sfdx force:package:install -p "04t4x000000UebsAAC" -w 10
```

list e.g. Layouts using `listMetadata`

```console
sfdx force:mdapi:listmetadata -m Layout
```

```diff
- actual
+ expected
```

```diff
[
   {
     "createdById": "00563000006alGRAAY",
     "createdByName": "User User",
     "createdDate": "1970-01-01T00:00:00.000Z",
-    "fileName": "customMetadata/mdapidummy2gen__Dummy_Configuration.Test.md",
-    "fullName": "mdapidummy2gen__Dummy_Configuration.Test",
+    "fileName": "customMetadata/mdapidummy2gen__Dummy_Configuration.mdapidummy2gen__Test.md",
+    "fullName": "mdapidummy2gen__Dummy_Configuration.mdapidummy2gen__Test",
     "id": "m010V000000sZ56QAE",
     "lastModifiedById": "00563000006alGRAAY",
     "lastModifiedByName": "User User",
     "lastModifiedDate": "1970-01-01T00:00:00.000Z",
     "manageableState": "installed",
     "namespacePrefix": "mdapidummy2gen",
     "type": "CustomMetadata"
   },
   {
     "createdById": "00563000006alGRAAY",
     "createdByName": "User User",
     "createdDate": "1970-01-01T00:00:00.000Z",
-    "fileName": "layouts/mdapidummy2gen__Vehicle__c-Vehicle Layout.layout",
-    "fullName": "mdapidummy2gen__Vehicle__c-Vehicle Layout",
+    "fileName": "layouts/mdapidummy2gen__Vehicle__c-mdapidummy2gen__Vehicle Layout.layout",
+    "fullName": "mdapidummy2gen__Vehicle__c-mdapidummy2gen__Vehicle Layout",
     "id": "00h63000002UAkxAAG",
     "lastModifiedById": "00563000006alGRAAY",
     "lastModifiedByName": "User User",
     "lastModifiedDate": "1970-01-01T00:00:00.000Z",
     "manageableState": "installed",
     "namespacePrefix": "mdapidummy2gen",
     "type": "Layout"
   },
   {
     "createdById": "00563000006alGRAAY",
     "createdByName": "User User",
     "createdDate": "1970-01-01T00:00:00.000Z",
-    "fileName": "quickActions/mdapidummy2gen__Vehicle__c.Deprecate.quickAction",
-    "fullName": "mdapidummy2gen__Vehicle__c.Deprecate",
+    "fileName": "quickActions/mdapidummy2gen__Vehicle__c.mdapidummy2gen__Deprecate.quickAction",
+    "fullName": "mdapidummy2gen__Vehicle__c.mdapidummy2gen__Deprecate",
     "id": "09Dd00000000oIjEAI",
     "lastModifiedById": "00563000006alGRAAY",
     "lastModifiedByName": "User User",
     "lastModifiedDate": "1970-01-01T00:00:00.000Z",
     "manageableState": "installed",
     "namespacePrefix": "mdapidummy2gen",
     "type": "QuickAction"
   }
 ]
```
