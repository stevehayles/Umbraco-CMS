angular.module('umbraco.mocks').
  factory('treeMocks', ['$httpBackend', 'mocksUtils', function ($httpBackend, mocksUtils) {
      'use strict';
      
      function getMenuItems() {

          if (!mocksUtils.checkAuth()) {
              return [401, null, null];
          }

          var menu = [
              { name: "Create", cssclass: "plus", alias: "create", metaData: {} },

              { seperator: true, name: "Delete", cssclass: "remove", alias: "delete", metaData: {} },
              { name: "Move", cssclass: "move", alias: "move", metaData: {} },
              { name: "Copy", cssclass: "copy", alias: "copy", metaData: {} },
              { name: "Sort", cssclass: "sort", alias: "sort", metaData: {} },

              { seperator: true, name: "Publish", cssclass: "globe", alias: "publish", metaData: {} },
              { name: "Rollback", cssclass: "undo", alias: "rollback", metaData: {} },

              { seperator: true, name: "Permissions", cssclass: "lock", alias: "permissions", metaData: {} },
              { name: "Audit Trail", cssclass: "time", alias: "audittrail", metaData: {} },
              { name: "Notifications", cssclass: "envelope", alias: "notifications", metaData: {} },

              { seperator: true, name: "Hostnames", cssclass: "home", alias: "hostnames", metaData: {} },
              { name: "Public Access", cssclass: "group", alias: "publicaccess", metaData: {} },

              { seperator: true, name: "Reload", cssclass: "refresh", alias: "users", metaData: {} },
          
                { seperator: true, name: "Empty Recycle Bin", cssclass: "trash", alias: "emptyrecyclebin", metaData: {} }
          ];

          return [200, menu, null];
      }

      function returnChildren(status, data, headers) {
          
          if (!mocksUtils.checkAuth()) {
              return [401, null, null];
          }

          var id = mocksUtils.getParameterByName(data, "id");
          var section = mocksUtils.getParameterByName(data, "treeType");
          var level = mocksUtils.getParameterByName(data, "level")+1;

          var url = "/umbraco/UmbracoTrees/ApplicationTreeApi/GetChildren?treeType=" + section + "&id=1234&level=" + level;
          var menuUrl = "/umbraco/UmbracoTrees/ApplicationTreeApi/GetMenu?treeType=" + section + "&id=1234&parentId=456";
          
          //hack to have create as default content action
          var action;
          if (section === "content") {
              action = "create";
          }

          var children = [
              { name: "child-of-" + section, childNodesUrl: url, id: level + "" + 1234, icon: "icon-file-alt", children: [], expanded: false, hasChildren: true, level: level, defaultAction: action, menuUrl: menuUrl },
              { name: "random-name-" + section, childNodesUrl: url, id: level + "" + 1235, icon: "icon-file-alt", children: [], expanded: false, hasChildren: true, level: level, defaultAction: action, menuUrl: menuUrl },
              { name: "random-name-" + section, childNodesUrl: url, id: level + "" + 1236, icon: "icon-file-alt", children: [], expanded: false, hasChildren: true, level: level, defaultAction: action, menuUrl: menuUrl },
              { name: "random-name-" + section, childNodesUrl: url, id: level + "" + 1237, icon: "icon-file-alt", routePath: "common/legacy/1237?p=" + encodeURI("developer/contentType.aspx?idequal1234"), children: [], expanded: false, hasChildren: true, level: level, defaultAction: action, menuUrl: menuUrl }
          ];

          return [200, children, null];
      }

      function returnApplicationTrees(status, data, headers) {

          if (!mocksUtils.checkAuth()) {
              return [401, null, null];
          }

          var section = mocksUtils.getParameterByName(data, "application");
          var url = "/umbraco/UmbracoTrees/ApplicationTreeApi/GetChildren?treeType=" + section + "&id=1234&level=1";
          var menuUrl = "/umbraco/UmbracoTrees/ApplicationTreeApi/GetMenu?treeType=" + section + "&id=1234&parentId=456";
          var t;
          switch (section) {

              case "content":
                  t = {
                      name: "content",
                      id: -1,
                      children: [
                          { name: "My website", id: 1234, childNodesUrl: url, icon: "icon-home", children: [], expanded: false, hasChildren: true, level: 1, defaultAction: "create", menuUrl: menuUrl },
                          { name: "Components", id: 1235, childNodesUrl: url, icon: "icon-cogs", children: [], expanded: false, hasChildren: true, level: 1, defaultAction: "create", menuUrl: menuUrl },
                          { name: "Archieve", id: 1236, childNodesUrl: url, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, defaultAction: "create", menuUrl: menuUrl },
                          { name: "Recycle Bin", id: -20, childNodesUrl: url, icon: "icon-trash", routePath: section + "/recyclebin", children: [], expanded: false, hasChildren: true, level: 1, defaultAction: "create", menuUrl: menuUrl }
                      ],
                      expanded: true,
                      hasChildren: true,
                      level: 0,
                      menuUrl: menuUrl,
                      metaData: { treeType: "Umbraco.Web.Trees.ContentTreeController" }
                  };

                  break;

              case "developer":
                  t = {
                      name: "developer",
                      id: -1,
                      children: [
                          { name: "Data types", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.DataTypeTreeController" } },
                          { name: "Macros", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.MacrosTreeController" } },
                          { name: "Pacakges", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.PackagesTreeController" } },
                          { name: "XSLT Files", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.XsltTreeController" } },
                          { name: "Razor Files", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.RazorTreeController" } }
                      ],
                      expanded: true,
                      hasChildren: true,
                      level: 0,
                      isContainer: true                      
                  };

                  break;
              case "settings":
                  t = {
                      name: "settings",
                      id: -1,
                      children: [
                          { name: "Stylesheets", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.StylesheetTreeController" } },
                          { name: "Templates", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.TemplatesTreeController" } },
                          { name: "Dictionary", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.DictionaryTreeController" } },
                          { name: "Media types", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.MediaTypesTreeController" } },
                          { name: "Document types", childNodesUrl: url, id: -1, icon: "icon-folder-close", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl, metaData: { treeType: "Umbraco.Web.Trees.ContentTypesTreeController" } }
                      ],
                      expanded: true,
                      hasChildren: true,
                      level: 0,
                      isContainer: true
                  };
                  
                  break;
              default:
                  
                  t = {
                      name: "randomTree",
                      id: -1,
                      children: [
                          { name: "random-name-" + section, childNodesUrl: url, id: 1234, icon: "icon-home", defaultAction: "create", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl },
                          { name: "random-name-" + section, childNodesUrl: url, id: 1235, icon: "icon-folder-close", defaultAction: "create", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl },
                          { name: "random-name-" + section, childNodesUrl: url, id: 1236, icon: "icon-folder-close", defaultAction: "create", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl },
                          { name: "random-name-" + section, childNodesUrl: url, id: 1237, icon: "icon-folder-close", defaultAction: "create", children: [], expanded: false, hasChildren: true, level: 1, menuUrl: menuUrl }
                      ],
                      expanded: true,
                      hasChildren: true,
                      level: 0,
                      menuUrl: menuUrl,
                      metaData: { treeType: "Umbraco.Web.Trees.RandomTreeController" }
                  };

                  break;
          }

      
          return [200, t, null];
      }


      return {
          register: function() {
              
              $httpBackend
                 .whenGET(mocksUtils.urlRegex('/umbraco/UmbracoTrees/ApplicationTreeApi/GetApplicationTrees'))
                 .respond(returnApplicationTrees);

              $httpBackend
                 .whenGET(mocksUtils.urlRegex('/umbraco/UmbracoTrees/ApplicationTreeApi/GetChildren'))
                 .respond(returnChildren);
              
              $httpBackend
                 .whenGET(mocksUtils.urlRegex('/umbraco/UmbracoTrees/ApplicationTreeApi/GetMenu'))
                 .respond(getMenuItems);
              
          }
      };
  }]);