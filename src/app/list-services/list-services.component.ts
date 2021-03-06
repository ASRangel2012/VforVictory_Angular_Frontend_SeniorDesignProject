import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BusinessService } from '../business.service';
import { FamilyService } from '../family.service';
import { NotesService } from '../notes.service'
import { ServicesService } from '../services.service';
import { ServiceModel } from '../service.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: ServiceModel[];
}

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css'],
  providers: [DatePipe]
})
export class ListServicesComponent implements OnInit {

    public activeList: ServiceModel[];
    public renderedList: ServiceModel[];
    public activeDataTable: DataTable;
    public renderedDataTable: DataTable;
    public currentDate = new Date();
    public today;
    public url;
    public userRole: number;

<<<<<<< Updated upstream
    constructor(public serviceService: ServicesService, public businessService: BusinessService, public familyService: FamilyService, public router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe) {
=======
    constructor(public serviceService: ServicesService, public businessService: BusinessService, public familyService: FamilyService, public notesService: NotesService, public router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe) {
>>>>>>> Stashed changes
      this.today = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
      this.userRole = JSON.parse(localStorage.getItem('currentUser')).role;
    }

    ngOnInit() {
      this.url = window.location.origin;

      this.serviceService.listActiveRequests().subscribe((activeReturned) => {
        if (activeReturned) {
          this.activeList = activeReturned.results;
          for(let i of this.activeList) {
            this.familyService.getFamilyById(i['family_id']).subscribe((responseData) => {
              if(responseData) {
                i.name = responseData.results[0]['first_name'] + " " + responseData.results[0]['last_name'];
                i.email = responseData.results[0]['email'];
                i.pizzaCard = responseData.results[0]['vPizza_giftcard'];
                i.pizzaAmount = responseData.results[0]['vPizza_refill_amount'];
              }
            });
            if(i['business_id'] == -1) {
              i.businessName = "V Pizza";
              i.businessCategory = "V Pizza";
            }
            else {
              this.businessService.getBusinessById(i['business_id']).subscribe((responseData) => {
                if(responseData){
                  i.businessName = responseData.results[0]['business_name'];
                  i.businessCategory = responseData.results[0]['Services_Offered'];
                }
              });
            }
          }
          this.activeDataTable = {
            headerRow: [ 'ID', 'Name', 'Email', 'Business', 'Category', 'Date Requested', 'Notified Family?', 'Notified Business?'],
            footerRow: [ 'ID', 'Name', 'Email', 'Business', 'Category', 'Date Requested', 'Notified Family?', 'Notified Business?'],
            dataRows: this.activeList
          };
         }
         else {
          this.activeDataTable = {
            headerRow: [ 'ID', 'Name', 'Email', 'Business', 'Category', 'Date Requested', 'Notified Family?', 'Notified Business?'],
            footerRow: [ 'ID', 'Name', 'Email', 'Business', 'Category', 'Date Requested', 'Notified Family?', 'Notified Business?'],
            dataRows: []
          };
         }
      });

      this.serviceService.listRenderedServices().subscribe((renderedReturned) => {
        if (renderedReturned) {
          this.renderedList = renderedReturned.results;
          for(let i of this.renderedList) {
            this.familyService.getFamilyById(i['family_id']).subscribe((responseData) => {
              if(responseData) {
                i.name = responseData.results[0]['first_name'] + " " + responseData.results[0]['last_name'];
                i.email = responseData.results[0]['email'];
              }
            });
            this.businessService.getBusinessById(i['business_id']).subscribe((responseData) => {
              if(responseData){
                i.businessName = responseData.results[0]['business_name'];
                i.businessCategory = responseData.results[0]['Services_Offered'];
              }
            });
          }
          this.renderedDataTable = {
            headerRow: [ 'ID', 'Name', 'Business', 'Date Requested', 'Date Fulfilled', 'Approved?', 'Family Followed Up?', 'Business Followed Up?', 'Service Value', 'Actual Cost'],
            footerRow: [ 'ID', 'Name', 'Business', 'Date Requested', 'Date Fulfilled', 'Approved?', 'Family Followed Up?', 'Business Followed Up?', 'Service Value', 'Actual Cost'],
            dataRows: this.renderedList
          };
         }
         else {
          this.renderedDataTable = {
            headerRow: [ 'ID', 'Name', 'Business', 'Date Requested', 'Date Fulfilled', 'Approved?', 'Family Followed Up?', 'Business Followed Up?', 'Service Value', 'Actual Cost'],
            footerRow: [ 'ID', 'Name', 'Business', 'Date Requested', 'Date Fulfilled', 'Approved?', 'Family Followed Up?', 'Business Followed Up?', 'Service Value', 'Actual Cost'],
            dataRows: []
          };
         }
      });
  }

  ngAfterViewInit(){

    $('#activetable').DataTable({
      "createdRow": function(row, data, dataIndex){
        if(data[3] == "V Pizza" || data[4] == "V Pizza"){
          $('td', row).css('background-color', '#ffcc00');
        }
      },
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        "emptyTable": "There are no available requests at this time.",
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      },
      bAutoWidth: false,
      aoColumns : [
        { sWidth: '2%' },
        { sWidth: '10%' },
        { sWidth: '10%' },
        { sWidth: '10%' },
        { sWidth: '10%' },
        { sWidth: '5%' },
        { sWidth: '5%' },
        { sWidth: '5%' },
        { sWidth: '20%' }
      ],
    });

    var aTable = $('#activetable').DataTable();

  $('#renderedtable').DataTable({
    "createdRow": function(row, data, dataIndex){
      if(data[5] == 0 || data[5] == "No"){
        $('td', row).css('background-color', '#ffcccc');
      }
    },
    "order": [[ 0, "desc" ]],
    "pagingType": "full_numbers",
    "lengthMenu": [
      [10, 25, 50, -1],
      [10, 25, 50, "All"]
    ],
    responsive: true,
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Search records",
    },
    bAutoWidth: false,
    aoColumns : [
      { sWidth: '2%' },
      { sWidth: '10%' },
      { sWidth: '10%' },
      { sWidth: '10%' },
      { sWidth: '10%' },
      { sWidth: '2%' },
      { sWidth: '2%' },
      { sWidth: '2%' },
      { sWidth: '5%' },
      { sWidth: '5%' },
      { sWidth: '20%' }
    ],
  });

  var rTable = $('#renderedtable').DataTable();

  $('#all').on('click', function () {
    rTable.search('').columns().search('').draw();
  });

  $('#approved').on('click', function () {
      rTable.columns(5).search("Yes").draw();
  });

  $('#denied').on('click', function () {
    rTable.columns(5).search("No").draw();
  });

  $('#novalue').on('click', function () {
    rTable.columns(8).search('^$', true, false).draw();
  });

  $('#nocost').on('click', function () {
    rTable.columns(9).search('^$', true, false).draw();
  });
}

  fulfillRequest(itemId, approved) {
    let serviceValue;
    if(approved == 1) {
      Swal.fire({
        title: "Fulfill request?",
        text: "It will be moved to the Services Rendered table.",
        inputPlaceholder: 'Enter value of service (optional)',
        html: `<p>It will be moved to the Services Rendered table.</p>
          <input type="text" id="newVal" class="swal2-input" placeholder="Enter the value of service">`,
        preConfirm: () =>{
          const fulV = document.getElementById('newVal') as HTMLInputElement;
          if(fulV.value && isNaN(parseFloat(fulV.value))) {
            Swal.showValidationMessage(
              'Numbers only, please!'
            )
          }
          else {
            serviceValue = parseFloat(fulV.value);
          }
        },
        type: "success",
        showCancelButton: true,
        cancelButtonClass: "btn",
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Yes, approve it!",
        cancelButtonText: "No, leave it!",
        reverseButtons: true
      })
      .then((fulfill) => {
        if(fulfill.value) {
          let user = JSON.parse(localStorage.getItem('currentUser'));
          const request: any = {
            id: itemId,
            approved: 1,
            currentUser: user['email'],
            value: serviceValue,
            followedUpB: 0,
            followedUpF: 0
          }
          this.serviceService.fulfillRequest(request).subscribe((responseData) => {
            if (responseData.requestFulfilled) {
              Swal.fire({
                title: "Request approved!",
                text: "The request has been moved to Services Rendered.",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
              }).then((confirm) => {
                if(confirm){
                  window.location.reload()
                }
              })
            }
          });
        }
      });
    }
    else {
      Swal.fire({
        title: "Deny request?",
        text: "It will be moved to the Services Rendered table.",
        type: "error",
        showCancelButton: true,
        cancelButtonClass: "btn",
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, deny it",
        cancelButtonText: "No, leave it!",
        reverseButtons: true
      })
      .then((fulfill) => {
        if(fulfill.value) {
          let user = JSON.parse(localStorage.getItem('currentUser'));
          const request: any = {
            id: itemId,
            approved: 0,
            currentUser: user['email'],
          }
          this.serviceService.fulfillRequest(request).subscribe((responseData) => {
            if (responseData.requestFulfilled) {
              Swal.fire({
                title: "Request denied.",
                text: "The request has been moved to Services Rendered.",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "error"
              }).then((confirm) => {
                if(confirm){
                  window.location.reload()
                }
              })
            }
          });
        }
      });
    }
  }

  viewPendingBusinessOptions(requestId, itemId, itemName, val) {
    Swal.fire({
      title: "Business Options",
      html: `
      <a href="` + this.url + `/#/business/view?businessId=` + itemId + `" class="btn btn-info">View Profile for ` + itemName + `</a>
      `,
      showCancelButton: true,
      cancelButtonClass: "btn",
      confirmButtonClass: "btn btn-primary",
      confirmButtonText: "Mark Business Notified",
      cancelButtonText: "Cancel",
      reverseButtons: true
    })
    .then((notify) => {
      if(notify.value) {
        const request: any = {
          id: requestId,
          toggle: val
        }
        this.serviceService.markBusinessNotified(request).subscribe((responseData) => {
          if (responseData.requestFulfilled) {
            Swal.fire({
              title: "Changes saved!",
              text: "The service request has been modified.",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success"
            }).then((confirm) => {
              if(confirm){
                window.location.reload()
              }
            })
          }
        });
      }
    });
  }
  viewPendingFamilyOptions(requestId, itemId, itemName, val) {
    Swal.fire({
      title: "Family Options",
      html: `
      <a href="` + this.url + `/#/family/view?familyId=` + itemId + `" class="btn btn-info">View Profile for ` + itemName + `</a>
      `,
      showCancelButton: true,
      cancelButtonClass: "btn",
      confirmButtonClass: "btn btn-primary",
      confirmButtonText: "Mark Family Notified",
      cancelButtonText: "Cancel",
      reverseButtons: true
    })
    .then((notify) => {
      if(notify.value) {
        const request: any = {
          id: requestId,
          toggle: val
        }
        this.serviceService.markFamilyNotified(request).subscribe((responseData) => {
          if (responseData.requestFulfilled) {
            Swal.fire({
              title: "Changes saved!",
              text: "The service request has been modified.",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success"
            }).then((confirm) => {
              if(confirm){
                window.location.reload()
              }
            })
          }
        });
      }
    });
  }

  viewRenderedBusinessOptions(requestId, itemId, itemName, val) {
    Swal.fire({
      title: "Business Options",
      html: `
      <a href="` + this.url + `/#/business/view?businessId=` + itemId + `" class="btn btn-info">View Profile for ` + itemName + `</a>
      `,
      showCancelButton: true,
      cancelButtonClass: "btn",
      confirmButtonClass: "btn btn-primary",
      confirmButtonText: "Mark Business Followed Up",
      cancelButtonText: "Cancel",
      reverseButtons: true
    })
    .then((notify) => {
      if(notify.value) {
        const request: any = {
          id: requestId,
          toggle: val
        }
        this.serviceService.markBusinessFollowedUp(request).subscribe((responseData) => {
          if (responseData.requestFulfilled) {
            Swal.fire({
              title: "Changes saved!",
              text: "The rendered service has been modified.",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success"
            }).then((confirm) => {
              if(confirm){
                window.location.reload()
              }
            })
          }
        });
      }
    });
  }

  viewRenderedFamilyOptions(requestId, itemId, itemName, val) {
    Swal.fire({
      title: "Family Options",
      html: `
      <a href="` + this.url + `/#/family/view?familyId=` + itemId + `" class="btn btn-info">View Profile for ` + itemName + `</a>
      `,
      showCancelButton: true,
      cancelButtonClass: "btn",
      confirmButtonClass: "btn btn-primary",
      confirmButtonText: "Mark Family Followed Up",
      cancelButtonText: "Cancel",
      reverseButtons: true
    })
    .then((notify) => {
      if(notify.value) {
        const request: any = {
          id: requestId,
          toggle: val
        }
        this.serviceService.markFamilyFollowedUp(request).subscribe((responseData) => {
          if (responseData.requestFulfilled) {
            Swal.fire({
              title: "Changes saved!",
              text: "The rendered service has been modified.",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success"
            }).then((confirm) => {
              if(confirm){
                window.location.reload()
              }
            })
          }
        });
      }
    });
  }

  deleteRequest(itemId) {
    Swal.fire({
      title: "DELETE SERVICE REQUEST?",
      text: "Would you like to permanently delete this request? This cannot be undone!",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn",
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, leave it!",
      reverseButtons: true
    })
    .then((mark) => {
      if(mark.value) {
        Swal.fire({
          title: "ARE YOU SURE?",
          text: "Once it has been deleted, it cannot be recovered!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn",
          confirmButtonClass: "btn btn-danger",
          confirmButtonText: "Yes, remove it!",
          cancelButtonText: "No, leave it!",
        })
        .then((doublemark) => {
          if(doublemark.value) {
            const request: any = {
              id: itemId,
            }
            this.serviceService.deleteRequest(request).subscribe((responseData) => {
              if (responseData.requestFulfilled) {
                Swal.fire({
                  title: "Request removed!",
                  text: "The service request has been deleted.",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success"
                }).then((confirm) => {
                  if(confirm){
                    window.location.reload()
                  }
                })
              }
            });
          }
        })
      }
      })
  }

  showClipboard(){
    Swal.fire({
      title: "Copied!",
      text: "The link to the Service Request form has been successfully copied to your clipboard.",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      type: "success"
      })

  }

  showNote(note) {
    Swal.fire({
      title: "Note from the Family",
      text: note,
      confirmButtonClass: "btn btn-success",
    })
  }

  setValueCost(itemId, currentVal, currentCost) {
    let cV = currentVal;
    if(!cV) {
      cV = "";
    }
    let cC = currentCost;
    if(!cC) {
      cC = "";
    }
    Swal.fire({
        title: "Edit Value/Cost",
        html: `<input type="text" id="newValue" class="swal2-input" value="` + cV + `" placeholder="Enter the value of service">
          <input type="text" id="newCost" class="swal2-input" value="` + cC + `" placeholder="Enter the actual cost">`,
        preConfirm: () =>{
          const thisV = document.getElementById('newValue') as HTMLInputElement;
          if(thisV.value && isNaN(parseFloat(thisV.value))) {
            Swal.showValidationMessage(
              'Numbers only, please!'
            )
          }
          else {
            cV = parseFloat(thisV.value);
          }

          const thisC = document.getElementById('newCost') as HTMLInputElement;
          if(thisC.value && isNaN(parseFloat(thisC.value))) {
            Swal.showValidationMessage(
              'Numbers only, please!'
            )
          }
          else {
            cC = parseFloat(thisC.value);
          }
        },
        showCancelButton: true,
        cancelButtonClass: "btn",
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Submit change",
        cancelButtonText: "Cancel",
        reverseButtons: true
      })
      .then((fulfill) => {
        if(fulfill.value) {
          const request: any = {
            id: itemId,
            value: cV,
            cost: cC
          }
          this.serviceService.setValueCost(request).subscribe((responseData) => {
            if (responseData.requestFulfilled) {
              Swal.fire({
                title: "Changes saved!",
                text: "The service value and/or cost have been updated.",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
              }).then((confirm) => {
                if(confirm){
                  window.location.reload()
                }
              })
            }
          });
        }
      });
  }

  markVPizzaRefilled(pizzaId, pizzaNum, pizzaBalance, requestId) {
    if(!pizzaNum) {
      Swal.fire({
        title: "No card found!",
        text: "Please add a V Pizza card to this family profile before marking it as refilled.",
        type: "error",
        showCancelButton: true,
        cancelButtonClass: "btn",
        confirmButtonClass: "btn btn-info",
        confirmButtonText: "Edit Profile",
        cancelButtonText: "No, cancel",
        reverseButtons: true
      }).then((confirm) => {
        if(confirm.value){
          this.router.navigate(['/family/edit'], { queryParams: { familyId: pizzaId } });
        }
      })

    }
    else {
      Swal.fire({
        title: "Mark this card refilled?",
        text: "This will appear in the V Pizza Transaction History page.",
        type: "info",
        showCancelButton: true,
        cancelButtonClass: "btn",
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Yes, refill",
        cancelButtonText: "No, cancel",
        reverseButtons: true
      })
      .then((refill) => {
        if(refill.value) {
          let user = JSON.parse(localStorage.getItem('currentUser'));
          const request: any = {
            id: pizzaId,
            balance: parseFloat(pizzaBalance),
            currentUser: user['email']
          }
          this.notesService.markPizzaRefilled(request).subscribe((pizzaData) => {
            if (pizzaData.refilled) {
              const remove: any = {
                id: requestId,
              }
              this.serviceService.deleteRequest(remove).subscribe((req) => {
                if (req.requestFulfilled) {
                  Swal.fire({
                    title: "Card refilled.",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-info",
                    type: "success"
                  }).then((confirm) => {
                    if(confirm){
                      window.location.reload()
                    }
                  })
                }
              });
            }
          });
        }
      });
    }
  }
}
