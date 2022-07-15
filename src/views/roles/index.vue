<template>
  <div>
    <el-select
      v-model="options.value"
      clearable placeholder="Select"
      class="elSelect"
      size="large"
      @change="selectChanged">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        change=""
      />
    </el-select>
    <el-button type="primary" size="large" @click="queryTable">查询教师课表</el-button>
  </div>
  <div class="table-k">
    <el-card class="box-card">
      <el-table :data="tableData" border  stripe style="width: 100%;" class="table-content" @cell-click="dj">
        <el-table-column fixed prop="time" label="时间" width="min-width" align="center"/>
        <el-table-column prop="Mon" label="周一" width="min-width"  align="center"/>
        <el-table-column prop="Tue" label="周二" width="min-width"  align="center"/>
        <el-table-column prop="Wed" label="周三" width="min-width" align="center"/>
        <el-table-column prop="Thur" label="周四" width="min-width" header-align="center" align="center"/>
        <el-table-column prop="Fri" label="周五" width="min-width" header-align="center" align="center"/>
        <el-table-column prop="Sat" label="周六" width="min-width" header-aligin="center" align="center"/>
        <el-table-column prop="Sun" label="周日" width="min-width" header-aligin="center" align="center"/>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { getTeachers, getTeacherCourses } from '../../api/teacher'
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const idArr = ref(new Array(4).fill(new Array(7).fill(0)))
const options = ref([])
const tableData = ref([
  {
    time: '8:00-10:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  },
  {
    time: '10:00-12:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  },
  {
    time: '14:00-16:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  },
  {
    time: '16:00-18:00',
    Mon: '',
    Tue: '',
    Wed: '',
    Thur: '',
    Fri: '',
    Sat: '',
    Sun: ''
  }
])

onMounted(async () => {
  await getTeachers().then(res => {
    res.data.map(function (obj) {
      options.value.push({
        value: obj.tid,
        label: obj.tname
      })
    })
  })
})

const selectChanged = async (value) => {
  clearTable()
  // console.log('value: ', value)
  await getTeacherCourses(value).then(res => {
    res.data.map(function (obj) {
      const arr = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
      const { course } = obj
      const timeNum = obj.time_num
      const class1 = obj.class
      const id = obj._id

      timeNum.forEach(e => {
        const num1 = Math.floor(e / 7)
        const num2 = e % 7
        const str = arr[num2]
        tableData.value[num1][str] = course.cname + ' ' + class1.bid
        idArr.value[num1][num2] = id
      })
    })
  })
}

const queryTable = () => {
  alert('hello')
  // selectChanged()
}

// 清空 tableData
const clearTable = () => {
  tableData.value = [
    {
      time: '8:00-10:00',
      Mon: '',
      Tue: '',
      Wed: '',
      Thur: '',
      Fri: '',
      Sat: '',
      Sun: ''
    },
    {
      time: '10:00-12:00',
      Mon: '',
      Tue: '',
      Wed: '',
      Thur: '',
      Fri: '',
      Sat: '',
      Sun: ''
    },
    {
      time: '14:00-16:00',
      Mon: '',
      Tue: '',
      Wed: '',
      Thur: '',
      Fri: '',
      Sat: '',
      Sun: ''
    },
    {
      time: '16:00-18:00',
      Mon: '',
      Tue: '',
      Wed: '',
      Thur: '',
      Fri: '',
      Sat: '',
      Sun: ''
    }
  ]
}

// const map1 = new Map([
//   ['Mon', 0],
//   ['Tue', 1],
//   ['Wed', 2],
//   ['Thur', 3],
//   ['Fri', 4],
//   ['Sat', 5],
//   ['Sun', 6]
// ])
// const map2 = new Map([
//   ['8:00-10:00', 0],
//   ['10:00-12:00', 1],
//   ['14:00-16:00', 2],
//   ['16:00-18:00', 3]
// ])

// const dj = (row, column, cell, event) => {
//   // console.log('row: ', row.time)
//   console.log('row: ', row.time)
//   console.log('column: ', column.property)
//   console.log('content: ', row[column.property])
//   console.log(map1)
//   console.log('map1: ', map1.get(row.time))
//   console.log('map2: ', map2.get(column.property))
//   // router.push('')
// }

</script>

<style scoped>
.table-k{
  margin: 10px;
  padding: 3px;
  /* background-color: rgb(101, 150, 210); */
}
.elSelect{
  padding: 20px 10px 5px 10px;
}
</style>