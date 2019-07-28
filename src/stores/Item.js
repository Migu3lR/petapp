import {types, getParent} from 'mobx-state-tree'

const Item = types.model('Item', {
  quantity: types.number,
  price: types.number,
  name: types.string
})
.actions(self => ({
  increment() {
    self.quantity = self.quantity + 1
  },
  decrement() {
    self.quantity = self.quantity - 1
    if(self.quantity <= 0) getParent(self, 2).remove(self)
  }
}))
.views(self => ({
  total() {
    return self.quantity * self.price;
  }
}))

export default Item;