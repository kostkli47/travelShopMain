
import {Modal} from "../../classess/modal";
import {toursDataArray} from "../../index"; // ссылка на массив с данными
import { ITours } from "models/tours";



// Определить типы для метода (возвращающие и для переменных в теле функции)

export function openModal(type:string, i: number):void {

    const data:ITours= toursDataArray[i];
    const tourId:string = data[i]?.id;

    let modalInfo = {};
    switch (type) {
        case "order":
            const modalTemplate:string = `
      <div> 
      <img class='pic-modal' src="/dist/${data.img}"/> 
      <p data-moda-id="tour-modal" class="close-modal">x</p>
      <p class="header-modal">${data.name}</p>
       <p>${data.description}</p>
       
       <div data-tour-id=${tourId} class="ticket-submit">
       <a href="/ticket.html">Купить билет</a>
</div>
     </div>
  `
            const modal: Modal = new Modal('tour-modal');
            modal.open(modalTemplate);
            break;
    }
}


