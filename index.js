/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-19
 * @author li <li@maichong.it>
 */

import wx from 'labrador';
import immutable from 'seamless-immutable';
import CartItem from 'al-cart-item';

const { array, func } = wx.PropTypes;

export default class Cart extends wx.Component {
  propTypes = {
    list: array,
    onItemTap: func,
    onItemDelete: func,
    onSelectList: func,
    onItemQuantitySet: func,
    onOrderCreateTap: func
  };

  data = {
    list: immutable([]),
    selectCount: 0,
    allSelectStatus: true,
    selectPrice: 0
  };

  children = {
    listItems: new wx.List(CartItem, 'list', {
      item: '>>',
      onSelect: '#handleItemSelect',
      onDelete: '#handleItemDelete',
      onQuantitySet: '#handleItemQuantitySet',
      onTap: '#handleItemTap'
    })
  };

  handleAllSelectTap() {

    let list = [];
    let selectCount = 0;
    let selectPrice = 0;
    let selectList = [];
    let allSelectStatus = !this.data.allSelectStatus;
    this.data.list.forEach((item) => {
      let temp = item.asMutable();
      if (this.data.allSelectStatus) {
        temp.checked = false;
      } else {
        temp.checked = true;
        selectCount += 1;
        selectPrice += temp.price * temp.quantity;
        selectList.push(temp.id);
      }
      list.push(immutable(temp));
    });
    console.log('selectList-----', selectList);
    this.props.onSelectList(selectList);
    this.setData({ list, selectList, selectCount, selectPrice, allSelectStatus });
  }

  handleItemSelect(component, select) {
    let id = this.data.list[component.key].id;
    console.log('ar-cart handleItemSelect', id, select);
    let list = [];
    let selectList = [];
    let selectPrice = 0;
    this.data.list.forEach((item) => {
      if (item.id === id) {
        let temp = item.asMutable();
        temp.checked = select;
        list.push(immutable(temp));
        if (select) {
          selectList.push(temp.id);
          selectPrice += temp.price * temp.quantity;
        }
      } else {
        if (item.checked) {
          selectList.push(item.id);
          selectPrice += item.price * item.quantity;
        }
        list.push(item);
      }
    });
    console.log('selectList-----', selectList);
    this.props.onSelectList(selectList);
    let allSelectStatus = selectList.length === this.data.list.length;
    this.setData({ list, selectList, selectCount: selectList.length, allSelectStatus, selectPrice });
  }

  handleItemDelete(component) {
    let id = this.data.list[component.key].id;
    console.log('al-cart----delete-', id);
    this.props.onItemDelete(id);
  }

  handleItemQuantitySet(component, quantity) {
    let id = this.data.list[component.key].id;
    console.log('al - cart handleItemQuantitySet', id);
    this.props.onItemQuantitySet(id, quantity);
  }

  handleItemTap(component) {
    let id = this.data.list[component.key].id;
    console.log('al-cart tap ------id,==', id);
    this.props.onItemTap(id);
  }

  onUpdate(props) {
    console.log('al cart props.list', props.list);
    let data = {
      list: [],
      selectCount: 0,
      selectPrice: 0,
      selectList: [],
      allSelectStatus: false
    };
    props.list.forEach((item) => {
      let flag = true;
      this.data.list.forEach((temp) => {
        if (item.id === temp.id) {
          flag = false;
          item.checked = temp.checked;
          data.list.push(immutable(item));
        }
      });
      if (flag) {
        item.checked = true;
        data.list.push(immutable(item));
      }
    });
    data.list.forEach((item) => {
      if (item.checked) {
        data.selectList.push(item.id);
        data.selectCount += 1;
        data.selectPrice += item.price * item.quantity;
      }
    });
    console.log('al cart list----', data.list);
    props.onSelectList(data.selectList);
    data.allSelectStatus = data.list.length === data.selectCount;
    this.setData(data);
  }

  handleCreateTap() {
    if (this.data.selectList.length > 0) {
      this.props.onOrderCreateTap();
    }
  }

  onLoad() {

  }

  onReady() {

  }

  onShow() {

  }

  onHide() {

  }

  onUnload() {

  }
}
