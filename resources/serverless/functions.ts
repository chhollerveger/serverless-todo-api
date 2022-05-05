import type { AWS } from '@serverless/typescript';

const handlerListPath = `dist/src/handlers/list`;
const handlerTaskPath = `dist/src/handlers/task`;

export const makeFunctions = (): AWS['functions'] => {
  return {
    createList: {
      handler: `${handlerListPath}/create.handler`,
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
      handler: `${handlerListPath}/delete.handler`,
      events: [
        {
          http: {
            method: 'DELETE',
            path: 'list/{listId}',
            cors: true,
            request: {
              parameters: {
                paths: {
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
      handler: `${handlerListPath}/get.handler`,
      events: [
        {
          http: {
            method: 'GET',
            path: 'list/{listId}',
            cors: true,
            request: {
              parameters: {
                paths: {
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
      handler: `${handlerListPath}/update.handler`,
      events: [
        {
          http: {
            method: 'UPDATE',
            path: 'list/{listId}',
            cors: true,
            request: {
              parameters: {
                paths: {
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
      handler: `${handlerTaskPath}/create.handler`,
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
      handler: `${handlerTaskPath}/update.handler`,
      events: [
        {
          http: {
            method: 'UPDATE',
            path: 'task/{taskId}',
            cors: true,
            request: {
              parameters: {
                paths: {
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
      handler: `${handlerTaskPath}/delete.handler`,
      events: [
        {
          http: {
            method: 'DELETE',
            path: 'task/{taskId}/{listId}',
            cors: true,
            request: {
              parameters: {
                paths: {
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
      handler: `${handlerTaskPath}/get.handler`,
      events: [
        {
          http: {
            method: 'GET',
            path: 'task/{taskId}/{listId}',
            cors: true,
            request: {
              parameters: {
                paths: {
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