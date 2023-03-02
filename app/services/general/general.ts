import{TicketType} from "../../models/ticket/ticket";
import {initTicketElementTemplate} from "../../templates/ticketInfo";
import {getTicketById, postTicketData} from "@rest/tickets";
import { ITours } from "models/tours";
import {getTourTemplate} from "../../templates/tours";
import {openModal} from "@services/modal/modalService";

let ticketPostInstance;

/* Общие методы используются для вставки текста в header   footer*/

/*  -
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы
*/
export function initHeaderTitle(ticketName:string, selector:string):void {
    const headerElement: HTMLElement= document.querySelector('header');
    const targetItem: HTMLElement = headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initFooterTitle(ticketName:string, selector:string):void {
    const headerElement: HTMLElement = document.querySelector('footer');
    const targetItem:HTMLElement = headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initTicketInfo(ticket: TicketType):void {
    const targetElement: Element = document.querySelector('.ticket-info');

    const ticketDescription:string = ticket?.description;
    const ticketOperator:string = ticket?.tourOperator;
    let vipClientType:string;if ("vipStatus" in ticket) {    vipClientType = ticket.vipStatus;}

    const ticketElemsArr: [string, string, string] = [ticketDescription, ticketOperator, vipClientType];

    
    let ticketElemTemplate:any;

    ticketElemsArr.forEach((el:string, i:number) => {
        ticketElemTemplate+= initTicketElementTemplate(el, i);
    });

    targetElement.innerHTML = ticketElemTemplate;

}


export function initUserData(): NodeListOf<Element>{
    const userInfo = document.querySelectorAll('.user-info > p');
    let userInfoObj;
        userInfo.forEach((el) => {
        const inputDataName:string = el.getAttribute('data-name');
        if (inputDataName) {
            const inputElems: HTMLInputElement = el.querySelector('input');
            userInfoObj[inputDataName] = inputElems.value;
        }
        });
    
        console.log('userInfoObj',userInfoObj)
        return userInfoObj;
    }

    export function initPostData(data):void {
        initUserData();
        postTicketData(data).then((data) => {
            if (data.success) {
    
            }
        })
    }

export function registerConfirmButton(): void {
        const targetEl: HTMLElement = document.getElementById('accept-order-button');
        if (targetEl) {
            targetEl.addEventListener('click', () => {
                initPostData(ticketPostInstance);
            });
        }
    }

    export function initToursDivElements(data:ITours[]):void {

        if (Array.isArray(data)) {
          const rootElement:Element = document.querySelector('.main-app');
          const tourWrap:HTMLDivElement = document.createElement('div');
      
          tourWrap.classList.add('tour-wrap');
      
          // init click for modal
          initTourElemListener(tourWrap);
      
          let rootElementData = '';
          data.forEach((el, i) => {
            rootElementData += getTourTemplate(el, i);
          });
      
          tourWrap.innerHTML = rootElementData;
          rootElement.appendChild(tourWrap) ;
        }
      }
      
      
      export function initTourElemListener(tourWrap:any):void {
        tourWrap.addEventListener('click', (ev) => {
          const targetItem = ev.target;
          const parentItem = targetItem?.parentNode;
          let realTarget:any;
      
          if (targetItem.hasAttribute('data-tour-item-index')) {
            realTarget = targetItem;
          } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
            realTarget = parentItem;
          }
      
          if (realTarget) {
            const dataIndex = realTarget.getAttribute('data-tour-item-index');
            openModal('order', Number(dataIndex));
          }
        });
      }