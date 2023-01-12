<template>
  <div id="example1">
    <hot-table
      :settings="hotSettings"
    ></hot-table>
  </div>
</template>

<script>
import Vue from "vue";
import { HotTable, HotColumn } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import Handsontable from "handsontable";
registerAllModules();

export default {
  name: "handsontable",
  data() {
    return {
      hotSettings: {
        data: [
          ["", "Tesla", "Nissan", "Toyota", "Honda", "Mazda", "Ford"],
          ["2017", 10, 11, 12, 13, 15, 16],
          ["2018", 10, 11, 12, 13, 15, 16],
          ["2019", 10, 11, 12, 13, 15, 16],
          ["2020", 10, 11, 12, 13, 15, 16],
          ["2021", 10, 11, 12, 13, 15, 16],
        ],
        rowHeaders: true,
        colHeaders: true,
        licenseKey: "non-commercial-and-evaluation",
        height: "auto",
        contextMenu: {
          callback(key, selection, clickEvent) {
            //菜单的回调函数 点击就会触发这条
            console.log(key, selection, clickEvent);
          },
          items: {
            row_above: {
              disabled() {
                // `disabled` 返回一个布尔值 决定这个选项能不能用
                // console.log(this);
                //这里的this不是vm
                return this.getSelectedLast()[0] === 0; // `this` === hot
              },
            },
            // A separator line can also be added like this:
            // 'sp1': { name: '---------' }
            // and the key has to be unique
            sp1: "---------",
            row_below: {
              name: "Click to add row below", // Set custom text for predefined option
            },
            about: {
              // 自定义选项 about是自己写的
              name() {
                // `name` can be a string or a function
                return "<b>Custom option</b>"; // Name can contain HTML
              },
              hidden() {
                // `hidden` can be a boolean or a function
                // Hide the option when the first column was clicked
                return this.getSelectedLast()[1] == 0; // `this` === hot
              },
              //点击自定义选项 callback里面代表要执行的函数
              callback(key, selection, clickEvent) {
                // Callback for specific option
                setTimeout(() => {
                  alert("Hello world!"); // Fire alert after menu close (with timeout)
                }, 0);
              },
            },
            colors: {
              // Own custom option
              name: "Colors...",
              submenu: {
                //子选项
                // Custom option with submenu of items
                items: [
                  {
                    // Key must be in the form 'parent_key:child_key'
                    key: "colors:red",
                    name: "Red",
                    //点击子选项会发生的事情
                    callback(key, selection, clickEvent) {
                      setTimeout(() => {
                        alert("You clicked red!");
                      }, 0);
                    },
                  },
                  { key: "colors:green", name: "Green" },
                  { key: "colors:blue", name: "Blue" },
                ],
              },
            },
            credits: {
              // Own custom property
              // Custom rendered element in the context menu
              renderer(hot, wrapper, row, col, prop, itemValue) {
                const elem = document.createElement("marquee");

                elem.style.cssText = "background: lightgray;";
                elem.textContent = "Brought to you by...";

                return elem;
              },
              disableSelection: true, // Prevent mouseoever from highlighting the item for selection
              isCommand: false, // Prevent clicks from executing command and closing the menu
            },
          },
        },
      },

    };
  },
  components: {
    HotTable,
    HotColumn,
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>