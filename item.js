/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-18
 * @author li <li@maichong.it>
 */

import wx from 'labrador';
import immutable from 'seamless-immutable';

const { object, func } = wx.PropTypes;

export default class CartItem extends wx.Component {
  propTypes = {
    item: object,
    onSelect: func,
    onDelete: func,
    onQuantitySet: func,
    onTap: func
  };
  data = {
    modalHidden: true
  };
  children = {};

  handleCheckboxTap() {
    console.log('al-cart-item handleCheckboxTap');
    this.props.onSelect(!this.data.item.checked);
  }

  handleMinus() {
    console.log('al-cart-item handleMinus');
    if (this.data.item.quantity > 1) {
      this.props.onQuantitySet(this.data.item.quantity - 1);
    }
  }

  handleChange(e) {
    console.log('al-cart-item handleChange');
    let quantity = Math.abs(parseInt(e.detail.value));
    if (quantity <= 0) quantity = 1;
    this.props.onQuantitySet(quantity);
  }

  handlePlus() {
    console.log('al-cart-item handlePlus');
    this.props.onQuantitySet(this.data.item.quantity + 1);
  }

  handleDeleteTap() {
    this.setData({ modalHidden: false });
  }

  handleModalConfirm() {
    this.setData({ modalHidden: true });
    console.log('al-cart-item--delete--');
    this.props.onDelete();
  }

  handleModalCancel() {
    this.setData({ modalHidden: true });
  }

  handleTap() {
    console.log('al-cart-item tap----', this.data.goods);
    this.props.onTap(this.data.goods);
  }

  onUpdate(props) {
    console.log('al-cart-item---update------', props);
    this.setData({
      item: immutable(props.item),
      checked: immutable(props.checked)

    });
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
