
// создать в разделе models интерфейс для класса и  применить реализацию к этому классу
export class Modal  {
  private readonly id:string;
  
      public static modals: Modal[]=[];
  
      constructor(id = null) {
          const findModal:Modal = Modal.modals.find(x => x.id ===id);
          if (findModal) {
              Modal.removeById(id);
          }
  
          Modal.modals.push(this);
          console.log("Modal.modals", Modal.modals);
          this.id = id || (Math.random() + Modal.modals.length);
      }
  
      public open(template: string): void {   
         const divWrap: HTMLDivElement = document.createElement("div");   
          divWrap.innerHTML = template;    
          divWrap.id = this.id;   
           divWrap.setAttribute('modal_id', this.id);
               divWrap.classList.add('modal-element');  
                 divWrap.addEventListener('click', this.closeModalHandler);  
                   document.body.appendChild(divWrap);
                  }
  
      public remove():void {
          const modalEl: HTMLElement = document.getElementById(this.id);
          if (modalEl) {
          modalEl.removeEventListener('click', this.closeModalHandler);
          modalEl.parentNode.removeChild(modalEl);
          }
      }
  
      public static removeById(id:string = null):void {
        let modalId: string = id;
    
        const findEl = Modal.modals.find(x => x.id ===id);
        if (findEl) {
            findEl.remove();
            Modal.modals = Modal.modals.filter((el) => el.id !== modalId);
        } else{
            if (Array.isArray(Modal.modals)) {
                const lastEl: Modal = Modal.modals.pop();
                if (lastEl) {
                    lastEl.remove();
                }
            }
        }
    }

    private closeModalHandler = (ev: Event):void => {    
      const target: HTMLElement = ev.target as HTMLElement;    
      if (target.classList.contains('close-modal')) {        
        this.remove();    
      }}
  }



