import { DataSource, Repository } from 'typeorm';
import { Item } from '../model/Item';

class ItemService {
  itemRepository: Repository<Item>;
  constructor(dataSource: DataSource) {
    this.itemRepository = dataSource.getRepository(Item);
  }

  async getItems(): Promise<Item[]> {
    const items = await this.itemRepository.find();
    return items;
  }

  async addItem(itemToAdd: { name: string; price: number }): Promise<Item> {
    const persistedItem = await this.itemRepository.save(itemToAdd);
    return persistedItem;
  }

  async getItemById(itemId: number): Promise<Item | null> {
    const selectedItem = await this.itemRepository.findOneBy({ id: itemId });
    return selectedItem;
  }

  async updateItemById(itemId: number, newValues: any): Promise<Item> {
    const updatedTask = await this.itemRepository.save({
      id: itemId,
      name: newValues.name,
      price: newValues.price,
    });

    return updatedTask;
  }

  async deleteItemById(itemId: number): Promise<void> {
    await this.itemRepository.delete({ id: itemId });
  }
}

export default ItemService;
