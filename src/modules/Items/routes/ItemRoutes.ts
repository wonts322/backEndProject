import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi';
import ItemService from '../services/ItemService';
import ItemController from '../controller/ItemController';
import { DataSource } from 'typeorm';
import Joi from 'joi';

class ItemRoutes {
  itemService: ItemService;
  itemController: ItemController;
  constructor(dataSource: DataSource) {
    this.itemService = new ItemService(dataSource);
    this.itemController = new ItemController(this.itemService);
  }

  getAll(): ServerRoute[] {
    return [
      {
        method: 'GET',
        path: '/items',
        handler: (request: Request, h: ResponseToolkit) =>
          this.itemController.getItems(request, h),
      },
      {
        method: 'POST',
        path: '/items',
        handler: (request: Request, h: ResponseToolkit) =>
          this.itemController.addItem(request, h),
        options: {
          validate: {
            payload: Joi.object({
              name: Joi.string().required().messages({
                'any.required': 'Field "name" is required',
              }),
              price: Joi.number().positive().required().messages({
                'any.required': 'Field "price" is required',
                'number.positive': 'Field "price" cannot be negative',
              }),
            }),
            failAction: (request, h, error: any) =>
              h
                .response({
                  errors: [
                    {
                      field: error.details[0].path[0],
                      message: error.details[0].message,
                    },
                  ],
                })
                .takeover()
                .code(400),
          },
        },
      },
      {
        method: 'GET',
        path: '/items/{id}',
        handler: (request: Request, h: ResponseToolkit) => {
          const itemId: number = parseInt(request.params.id);
          return this.itemController.getItemById(request, h, itemId);
        },
      },
      {
        method: 'PUT',
        path: '/items/{id}',
        handler: (request: Request, h: ResponseToolkit) => {
          const itemId: number = parseInt(request.params.id);
          return this.itemController.updateItemById(request, h, itemId);
        },
        options: {
          validate: {
            payload: Joi.object({
              name: Joi.string().required().messages({
                'any.required': 'Field "name" is required',
              }),
              price: Joi.number().positive().messages({
                'any.required': 'Field "price" is required',
                'number.positive': 'Field "price" cannot be negative',
              }),
            }),
            failAction: (request, h, error: any) =>
              h
                .response({
                  errors: [
                    {
                      field: error.details[0].path[0],
                      message: error.details[0].message,
                    },
                  ],
                })
                .takeover()
                .code(400),
          },
        },
      },
      {
        method: 'DELETE',
        path: '/items/{id}',
        handler: (request: Request, h: ResponseToolkit) => {
          const itemId: number = parseInt(request.params.id);

          return this.itemController.deleteItemById(request, h, itemId);
        },
      },
    ];
  }
}

export default ItemRoutes;
