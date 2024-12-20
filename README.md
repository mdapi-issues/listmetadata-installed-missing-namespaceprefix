# listmetadata-installed-missing-namespaceprefix

> Minimal working example to demonstrate a bug in listMetadata where installed components of some metadata types are not prefixed with the namespace

[![Actions Status](https://github.com/mdapi-issues/listmetadata-installed-missing-namespaceprefix/workflows/Test%20and%20Release/badge.svg)](https://github.com/mdapi-issues/listmetadata-installed-missing-namespaceprefix/actions)

**Affected metadata types**:

- `CustomMetadata` (UPDATE: FIXED)
- `Layout`
- `QuickAction` (UPDATE: FIXED)

## Steps to reproduce the issue

Clone this repository.

Create a scratch org and install a dummy managed package

```console
npm
npm run develop
```

list e.g. Layouts using `listMetadata`

```console
sf org list metadata -m Layout
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
