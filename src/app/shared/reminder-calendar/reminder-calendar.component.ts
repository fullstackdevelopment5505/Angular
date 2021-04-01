import { Component, OnInit,Input,AfterViewInit,  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, } from '@angular/core';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { AuthService } from 'src/app/service/auth.service';



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-reminder-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reminder-calendar.component.html',
  styleUrls: ['./reminder-calendar.component.scss'],
  providers: [DatePipe]
})
export class ReminderCalendarComponent implements OnInit {
  @Input() public data;
  constructor(private activeModel: NgbActiveModal,private modal:NgbModal,private authService:AuthService,private datePipe: DatePipe) { }

  ngOnInit() {
    console.log(this.data)
    const data= this.data.map(item=>(
      {
        id: item.id,
        start: new Date(item.start),
        title: `${this.datePipe.transform(item.start, 'shortTime')} | ${item.title}`,
        color: colors.yellow,
        actions: this.actions,
        draggable: false,
      }
    ))
    console.log(data)
    this.events=data
  }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event)
    console.log(action)
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    if(action === 'Deleted'){
      this.authService.deleteReminder(event.id).subscribe(data=>{
        console.log(data)
      })
    }

  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }



  
  closeBtn():void {
    this.activeModel.close();
  }

}
