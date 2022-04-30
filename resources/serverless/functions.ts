import type { AWS } from '@serverless/typescript';

export const makeFunctions = (): AWS['functions'] => {
  return {
    createList: {
      handler: 'src.handlers.list.create.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'list/create',
            cors: true
          }
        }
      ]
    },
    deleteList: {
      handler: 'src.handlers.list.delete.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'list/delete',
            cors: true
          }
        }
      ]
    },
    getList: {
      handler: 'src.handlers.list.get.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'list',
            cors: true
          }
        }
      ]
    },
    updateList: {
      handler: 'src.handlers.list.update.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'list/update',
            cors: true
          }
        }
      ]
    },
    // createTask: {
    //   handler: 'handler.createTask',
    //   events: [
    //     {
    //       http: {
    //         method: 'POST',
    //         path: 'task/create',
    //         cors: true
    //       }
    //     }
    //   ]
    // },
    // deleteTask: {
    //   handler: 'handler.deleteTask',
    //   events: [
    //     {
    //       http: {
    //         method: 'POST',
    //         path: 'task/delete',
    //         cors: true
    //       }
    //     }
    //   ]
    // },
    // updateTask: {
    //   handler: 'handler.updateTask',
    //   events: [
    //     {
    //       http: {
    //         method: 'POST',
    //         path: 'task/update',
    //         cors: true
    //       }
    //     }
    //   ]
    // }
  }
}