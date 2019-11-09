/* 
自定义Promise模块
*/
(function (window) {

  const PENDING = 'pending' // 初始未确定的状态
  const RESOLVED = 'resolved' // 成功的状态
  const REJECTED = 'rejected' // 失败的状态
  
  /* 
  Promise构造函数
  */
  function Promise(excutor) {
    const self = this // Promise的实例对象
    self.status = PENDING // 状态属性, 初始值为pending, 代表初始未确定的状态
    self.data = undefined // 用来存储结果数据的属性, 初始值为undefined
    self.callbacks = []  // {onResolved(){}, onRejected(){}}

    /* 
    将promise的状态改为成功, 指定成功的value
    */
    function resolve(value) {
      // 如果当前不是pending, 直接结束
      if (self.status!==PENDING) return

      self.status = RESOLVED // 将状态改为成功
      self.data = value // 保存成功的value

      // 异步调用所有缓存的待执行成功的回调函数
      if (self.callbacks.length>0) {
        // 启动一个延迟时间为0的定时器, 在定时器的回调中执行所有成功的回调
        setTimeout(() => {
          self.callbacks.forEach(cbsObj => {
            cbsObj.onResolved(value)
          })
        })
      }
    }

    /* 
    将promise的状态改为失败, 指定失败的reason
    */
    function reject(reason) {
      // 如果当前不是pending, 直接结束
      if (self.status!==PENDING) return

      self.status = REJECTED // 将状态改为失败
      self.data = reason // 保存reason数据

      // 异步调用所有缓存的待执行失败的回调函数
      if (self.callbacks.length>0) {
        // 启动一个延迟时间为0的定时器, 在定时器的回调中执行所有失败的回调
        setTimeout(() => {
          self.callbacks.forEach(cbsObj => {
            cbsObj.onRejected(reason)
          })
        })
      }
    }
    
    // 调用excutor来启动异步任务
    try {
      excutor(resolve, reject)
    } catch (error) { // 执行器执行出错, 当前promise变为失败
      console.log('-----')
      reject(error)
    }
    
  }

  /* 
  用来指定成功/失败回调函数的方法
  */
  Promise.prototype.then = function (onResolved, onRejected) {
    // 保存回调函数
    this.callbacks.push({ // 将2个回调函数以对象的形式保存到promise对象上
      onResolved,
      onRejected
    })
  }

  /* 
  用来指定失败回调函数的方法
  */
  Promise.prototype.catch = function (onRejected) {
      
  }

  /* 
  用来返回一个指定vlaue的成功的promise
  */
  Promise.resolve = function (value) {
    
  }

  /* 
  用来返回一个指定reason的失败的promise
  */
  Promise.reject = function (reason) {
      
  }

  /* 
  返回一个promise, 只有当数组中所有promise都成功才成功, 否则失败
  */
  Promise.all = function (promises) {
    
  }

  /* 
  返回一个promise, 由第一个完成promise决定
  */
  Promise.race = function (promises) {
    
  }


  // 向外暴露Promise
  window.Promise = Promise

})(window)