<template>
  <div>
    <!-- 维修保养 -->
    <el-dialog title="维修保养" :visible.sync="showtitle" style="overflow: hidden;">
      <el-form
        ref="maintenanceForm"
        :rules="maintenanceRules"
        label-position="right"
        label-width="80px"
        :model="maintenanceList.addmsg"
      >
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="日期" prop="maintaintime">
                <el-date-picker
                  style="width:150px"
                  value-format="yyyy-MM-dd"
                  v-model="maintenanceList.addmsg.maintaintime"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="类型" prop="param1">
                <el-select v-model="maintenanceList.addmsg.param1" placeholder="请选择">
                  <el-option label="全部" value></el-option>
                  <el-option label="维修" value="维修"></el-option>
                  <el-option label="保养" value="保养"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上传图片" prop="img">
                <el-upload
                  ref="uploadimg"
                  class="upload-demo"
                  :action="$http.defaults.baseURL + 'MotorDetail/addBaoYangInformation'"
                  :file-list="maintenanceList.addmsg.fileList"
                  :on-change="onChange"
                  :on-remove="onRemove"
                  :on-success="uploadimgSuccess"
                  :data="maintenanceList.addmsg"
                  multiple
                  :auto-upload="false"
                  :limit="3"
                >
                  <el-button size="medium" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12" :offset="1">
            <div class="grid-content">
              <el-form-item label="保养内容" prop="maintaindiscript">
                <el-input
                  type="textarea"
                  resize="none"
                  v-model="maintenanceList.addmsg.maintaindiscript"
                  :autosize="{ minRows: 7, maxRows: 4}"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5" :offset="1">
            <div class="grid-content bg-purple">
              <el-button type="primary" style="width: 80%" @click="maintenanceSubmit">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div class="abnormalsearch" style="margin: 10px 0">
        <span style="margin-right: 10px">
          类型
          <el-select v-model="maintenanceList.search.param1" placeholder="请选择">
            <el-option label="全部" value></el-option>
            <el-option label="维修" value="维修"></el-option>
            <el-option label="保养" value="保养"></el-option>
          </el-select>
        </span>
        <span>
          记录时间段
          <el-date-picker
            v-model="maintenanceList.search.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <div class="btn">
            <el-button type="primary" @click="showmaintenance">搜索</el-button>
            <el-button type="primary">清空</el-button>
          </div>
        </span>
      </div>

      <el-table
        :data="maintenanceList.list.slice((maintenanceList.currpage - 1) * maintenanceList.pagesize, maintenanceList.currpage * maintenanceList.pagesize)"
      >
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="maintaintime" label="维修/保养时间"></el-table-column>
        <el-table-column align="center" prop="param1" label="类型"></el-table-column>
        <el-table-column align="center" prop="maintaindiscript" label="保养详情"></el-table-column>
        <el-table-column align="center" label="保养图片">
          <template slot-scope="scope">
            <el-image
              v-for="(item, i) in scope.row.maintainfile"
              :key="i"
              class="img"
              style="width: 50px; height: 50px"
              :src="item"
              fit="fill"
              @click="showimgs(item)"
            ></el-image>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :current-page="maintenanceList.currpage"
          :page-size="maintenanceList.pagesize"
          :page-sizes="[15, 20, 25]"
          layout="total, sizes, prev, pager, next"
          :total="maintenanceList.list.length"
          @prev-click="maintenancenextpage"
          @next-click="maintenancenextpage"
          @current-change="maintenancenextpage"
          @size-change="maintenancesizeChange"
        ></el-pagination>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
export default {
  props: ["showtitle"],
  data() {
    return {
      show: this.showtitle,
      // 保养记录
      maintenanceList: {
        addmsg: {
          busnumber: "",
          maintaintime: "",
          param1: "",
          maintaindiscript: "",
          fileList: []
        },
        search: {
          param1: "",
          date: "",
          busnumber: ""
        },
        pagesize: 15,
        currpage: 1,
        list: []
      },
      // 保养记录非空验证
      maintenanceRules: {
        maintaintime: [
          { required: true, message: "请选择日期", trigger: "blur" }
        ],
        param1: [{ required: true, message: "请选择类型", trigger: "blur" }],
        maintaindiscript: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        img: [{ required: true, message: "请选择上传图片" }]
      },
      // 保养记录 点击后大图片
      url: "",
      // 弹出层
      maintenance: true,
      // 显示图片
      showimg: false
    };
  },
  methods: {
    // 显示保养记录
    showmain(row) {
      this.maintenance = !this.maintenance;
      this.maintenanceList.search.busnumber = row.busnumber;
      this.maintenanceList.addmsg.busnumber = row.busnumber;
      this.showmaintenance();
    },
    // 保养记录显示具体图片
    showimgs(v) {
      this.url = v;
      this.showimg = !this.showimg;
    },
    // 保养列表获取
    showmaintenance() {
      if (this.maintenanceList.search.date != null) {
        this.maintenanceList.search.startTime = this.maintenanceList.search.date[0];
        this.maintenanceList.search.endTime = this.maintenanceList.search.date[1];
      } else if (this.maintenanceList.search.date == null) {
        this.maintenanceList.search.startTime = "";
        this.maintenanceList.search.endTime = "";
      }
      this.$http
        .post(
          "/manage/baoYangCriteriaQuery",
          this.$qs.stringify(this.maintenanceList.search)
        )
        .then(res => {
          for (const key in res.data) {
            res.data[key].maintainfile = res.data[key].maintainfile.split(";");
          }
          this.maintenanceList.list = res.data;
          this.imgupload = false;
          this.maintenanceRules.img = [
            { required: true, message: "请选择上传图片" }
          ];
        });
    },
    // 保养记录上传
    maintenanceSubmit() {
      if (this.imgupload) {
        this.maintenanceRules.img = [];
        this.$refs["maintenanceForm"].validate(valid => {
          if (valid) {
            this.$refs.uploadimg.submit();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$refs["maintenanceForm"].validate();
      }
      console.log(this.imgupload);
    },
    // 保养记录上传成功回调
    uploadimgSuccess(response, file, fileList) {
      this.$message({
        message: "添加记录成功",
        type: "success",
        offset: 165
      });
      this.maintenanceList.addmsg = {
        busnumber: "",
        maintaintime: "",
        param1: "",
        maintaindiscript: "",
        fileList: []
      };
      this.showmaintenance();
    },
    // 保养记录图片添加非空验证
    onChange(file, filelist) {
      if (filelist.length != 0) {
        this.$refs["maintenanceForm"].clearValidate("img");
        this.imgupload = true;
      }
    },
    // 保养记录图片删除非空验证
    onRemove(file, filelist) {
      if (filelist.length == 0) {
        this.maintenanceRules.img = [
          { required: true, message: "请选择上传图片" }
        ];
        this.$refs["maintenanceForm"].validateField("img");
        this.imgupload = false;
      }
    },
    // 保养记录下一页
    maintenancenextpage(value) {
      this.maintenanceList.currpage = value;
    },
    // 保养记录显示条数切换
    maintenancesizeChange(total) {
      console.log(total);
      this.maintenanceList.pagesize = total;
    }
  },
  created() {}
};
</script>

<style>
</style>