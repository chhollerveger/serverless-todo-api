import type { AWS } from '@serverless/typescript';

export const makeFunctions = (): AWS['functions'] => {
  return {
    createList: {
      handler: 'src.handlers.list.create.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'list',
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
            method: 'DELETE',
            path: 'list',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  listId: {
                    required: true
                  }
                }
              }
            }
          }
        }
      ]
    },
    getList: {
      handler: 'src.handlers.list.get.handler',
      events: [
        {
          http: {
            method: 'GET',
            path: 'list',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  listId: {
                    required: true
                  }
                }
              }
            }
          }
        }
      ]
    },
    updateList: {
      handler: 'src.handlers.list.update.handler',
      events: [
        {
          http: {
            method: 'UPDATE',
            path: 'list',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  listId: {
                    required: true
                  }
                }
              }
            }
          }
        }
      ]
    },
    createTask: {
      handler: 'src.handlers.task.create.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'task',
            cors: true
          }
        }
      ]
    },
    updateTask: {
      handler: 'src.handlers.task.update.handler',
      events: [
        {
          http: {
            method: 'UPDATE',
            path: 'task',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  taskId: {
                    required: true
                  }
                }
              }
            }
          }
        }
      ]
    },
    deleteTask: {
      handler: 'src.handlers.task.delete.handler',
      events: [
        {
          http: {
            method: 'DELETE',
            path: 'task',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  taskId: {
                    required: true
                  },
                  listId: {
                    required: true
                  }
                }
              }
            }
          }
        }
      ]
    },
    getTask: {
      handler: 'src.handlers.task.get.handler',
      events: [
        {
          http: {
            method: 'GET',
            path: 'task',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  taskId: {
                    required: true
                  },
                  listId: {
                    required: true
                  }
                }
              }
            }
          }
        }
      ]
    }
  }
}