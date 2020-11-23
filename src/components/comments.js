import Component from '../../lib/component.js';
import store from '../store/index.js';
import DOMNode from '../dom-node.js';
import SolidClient from '../solid-client.js';

export default class Comments extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.solid-comment-list')
    });
  }

  async render() {
    let outerHTMLComments = '';
    const solidClient = new SolidClient();
    const pathname = '/solid-comment/';
    // const comments = await solidClient.get(pathname);
    const commentFileValue = await solidClient.get(`${pathname}text.text`);
    // store.dispatch('setComments', comments);
    // console.log(await comments.text())
    // console.log(await commentFile.text())

    // comments.forEach(comment => {
    //   outerHTMLComments += new DOMNode({
    //     type: 'li',
    //     innerHTML: comment,
    //     classList: []
    //   }).$node.outerHTML;
    // });
    outerHTMLComments += new DOMNode({
      type: 'li',
      innerHTML: await commentFileValue.text(),
      classList: []
    }).$node.outerHTML;

    this.element.innerHTML = outerHTMLComments;
  }
}
