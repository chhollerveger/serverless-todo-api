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
      handler: `${handlerListPath}/get.handler`,
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
      handler: `${handlerListPath}/update.handler`,
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
      handler: `${handlerTaskPath}/delete.handler`,
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
      handler: `${handlerTaskPath}/get.handler`,
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