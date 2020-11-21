import SolidAuthClient from 'solid-auth-client';
import DomNodeCreator from './dom-node-creator.js';

const domNodeCreator = new DomNodeCreator()
domNodeCreator.createCommentModule()

async function popupLogin() {
  let session = await SolidAuthClient.currentSession();
  let popupUri = 'https://solidcommunity.net/common/popup.html';
  if (!session)
    session = await SolidAuthClient.popupLogin({ popupUri });
  alert(`Logged in as ${session.webId}`);
}

document.addEventListener('DOMContentLoaded', () => {
  domNodeCreator.$commentNode.$login.$node.addEventListener('click', () => {
    popupLogin();
  })
})
