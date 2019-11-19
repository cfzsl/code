<template>
  <!-- 组织架构 -->
  <div id="tree">
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="page-header">
          <h3>组织结构</h3>
        </div>
        <div class="text-center">
          <vue2-org-tree
            name="test"
            :data="data"
            :horizontal="horizontal"
            :collapsable="collapsable"
            :label-class-name="labelClassName"
            :render-content="renderContent"
            @on-expand="onExpand"
            @on-node-click="onNodeClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        id: 0,
        label: "总经理",
        children: [
          {
            id: 1,
            label: "副经理",
            children: [
              {
                id: 11,
                label: "行政人事部"
              }
            ]
          },
          {
            id: 2,
            label: "副经理",
            children: [
              {
                id: 21,
                label: "生产运行部"
              }
            ]
          },
          {
            id: 3,
            label: "副经理",
            children: [
              {
                id: 31,
                label: "安全质量监督部"
              }
            ]
          },
          {
            id: 4,
            label: "项目经理",
            children: [
              {
                id: 41,
                label: "助理"
              },
              {
                id: 42,
                label: "中队长",
                children: [
                  {
                    id: 421,
                    label: "班组长",
                    children: [
                      {
                        id: 4211,
                        label: "环卫工"
                      }
                    ]
                  }
                ]
              },
              {
                id: 43,
                label: "司机"
              },
              {
                id: 44,
                label: "班车人员"
              }
            ]
          }
        ]
      },
      // 横排
      horizontal: false,
      // 竖排
      collapsable: false,
      expandAll: false,
      // 颜色
      labelClassName: "bg-white"
    };
  },
  methods: {
    renderContent(h, data) {
      return data.label;
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    //点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
    onNodeClick(e, data) {
      //console.log(data.label);
      if (data.url == null) {
        return false;
      } else {
        window.open(data.url);
      }
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  }
};
</script>
<style type="text/css">
.org-tree-node-label {
  white-space: nowrap;
}
.bg-white {
  background-color: #CCFFFF;
  border: 1px solid #ccc;
}
.text-center {
  text-align: center;
}
</style>

