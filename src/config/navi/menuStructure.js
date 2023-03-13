// export default [
//   {
//     path: "/default",
//     component: () => import("@/views/samples/views/Default"),
//     meta: {
//       appId: "default",
//       icon: "info",
//       label: "Hello 元年",
//       // 获取多语言参数
//       translation: {
//         modules: [
//             // "common"
//         ],
//         keys: [
//             // "common.add"
//         ]
//       }
//     }
//   },
//   {
//     path: "/about",
//     component: () => import("@/views/platform/About"),
//     meta: {
//       appId: "about",
//       icon: "info",
//       label: "关于"
//     }
//   },
//   {
//     path: "/",
//     component: () => import("@/views/samples/views/Default"),
//     meta: {
//       appId: "default2"
//     }
//   },
//   {
//     path: "/samples",
//     meta: {
//       appId: "samples",
//       icon: "pie-chart",
//       label: "演示事例"
//     },
//     //这里没配置组件 没有页面
//     children: [
//       {
//         path: "/samples/DashBoard",
//         component: () => import("@/views/samples/views/DashBoard"),
//         meta: {
//           appId: "DashBoard",
//           icon: "appstore",
//           label: "Dash Board"
//         }
//       },
//       {
//         path: "/samples/sample1",
//         component: () => import("@/views/samples/views/Sample1"),
//         meta: {
//           icon: "layout",
//           appId: "sample1",
//           label: "插槽支持"
//         }
//       },
//       {
//         path: "/samples/sample4",
//         component: () => import("@/views/samples/views/Sample4"),
//         meta: {
//           appId: "sample4",
//           icon: "pic-left",
//           label: "响应式设计1"
//         }
//       },
//       {
//         path: "/samples/sample3",
//         component: () => import("@/views/samples/views/Sample3"),
//         meta: {
//           appId: "sample3",
//           icon: "cluster",
//           label: "响应式设计2"
//         }
//       },
//       {
//         path: "/samples/sample2",
//         component: () => import("@/views/samples/views/Sample2"),
//         meta: {
//           appId: "sample2",
//           icon: "cluster",
//           label: "嵌套列表"
//         }
//       }
//     ]
//   },
// ];
export default [
  {
    path: "/",
    component: () => import("@/views/preciseRelease/index"),
    // component: () => import("@/views/Type/index"),
    // component: () => import("@/views/trackingFormula/index"),
  },
  {
    path: "/preciseRelease",
    component: () => import("@/views/preciseRelease/index"),
  },
  {
    path: "/formTag",
    component: () => import("@/views/formGrouping/index"),
  },
  {  
    path: "/trackingFormula",
    component: () => import("@/views/trackingFormula/index"),
  },
]