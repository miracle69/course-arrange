import service from './request'

const getTeachers = () => {
  return service({
    url: '/teacher',
    method: 'GET'
  })
}

const getTeacherCourses = (id) => {
  const tid = id.toString()
  return service({
    url: '/arrange/teacher/' + tid,
    method: 'GET'
  })
}

export {
  getTeachers,
  getTeacherCourses
}
