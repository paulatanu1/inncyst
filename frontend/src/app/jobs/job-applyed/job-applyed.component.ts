import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-job-applyed',
  templateUrl: './job-applyed.component.html',
  styleUrls: ['./job-applyed.component.scss']
})
export class JobApplyedComponent implements OnInit {

  items: MenuItem[]=[];
  statusItems: MenuItem[]=[];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.items = [
            {
                tooltipOptions: {
                    tooltipLabel: "View and Manage Details",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-briefcase',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Archive",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-arrow-circle-down',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Withdraw Application",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-minus-circle',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Report Job",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-flag-fill',
                // routerLink: ['/fileupload']
            }
        ];
        this.statusItems = [
          {
                tooltipOptions: {
                    tooltipLabel: "Interviewing",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-calendar-plus',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Offer Received",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-thumbs-up-fill',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Hired",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-user',
                command: () => {
                    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Not Selected",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-thumbs-down-fill',
                // routerLink: ['/fileupload']
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Not interested",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-thumbs-down-fill',
                // routerLink: ['/fileupload']
            }
        ]
  }

}
