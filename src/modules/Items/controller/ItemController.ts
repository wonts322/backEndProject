import { Request, ResponseToolkit } from '@hapi/hapi';
import ItemService from '../services/ItemService';
import { Item } from '../model/Item';

class ItemController {
  itemService: ItemService;
  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  async getItems(request: Request, h: ResponseToolkit) {
    try {
      const persistedItems = await this.itemService.getItems();

      const parsedPersistItems = persistedItems.map(
        item => ({ ...item }) as Object,
      );

      return h.response(parsedPersistItems).code(200);
    } catch (error) {
      console.error(error);
      return h.response().code(500);
    }
  }

  async addItem(request: Request, h: ResponseToolkit) {
    try {
      const payload: any = { ...(request.payload as object) };
      const itemToAdd = {
        name: payload.name,
        price: payload.price,
      };

      const persistedItem: Item = await this.itemService.addItem(itemToAdd);
      return h.response(persistedItem).code(201);
    } catch (error: any) {
      console.error(error);
      return h.response().code(500);
    }
  }

  async getItemById(request: Request, h: ResponseToolkit, itemId: number) {
    try {
      const selectedItem = await this.itemService.getItemById(itemId);

      const itemWasSelected = selectedItem !== null;
      if (itemWasSelected) {
        return h.response(selectedItem).code(200);
      } else {
        return h.response().code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response().code(500);
    }
  }

  async updateItemById(request: Request, h: ResponseToolkit, itemId: number) {
    try {
      const newValues: any = { ...(request.payload as object) };

      const updatedItem: Item = await this.itemService.updateItemById(
        itemId,
        newValues,
      );
      return h.response(updatedItem).code(200);
    } catch (error) {
      console.error(error);
      return h.response().code(500);
    }
  }

  async deleteItemById(request: Request, h: ResponseToolkit, itemId: number) {
    try {
      await this.itemService.deleteItemById(itemId);
      return h.response().code(204);
    } catch (error) {
      console.error(error);
      return h.response().code(500);
    }
  }
}

export default ItemController;
