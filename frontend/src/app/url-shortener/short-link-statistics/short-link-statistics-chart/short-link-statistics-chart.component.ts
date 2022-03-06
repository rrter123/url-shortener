import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EChartsOption } from 'echarts';
import { Subscription, map, switchMap, tap } from 'rxjs';
import { BackendService } from 'src/app/shared/backend-service.service';
import { endOfMonth, startOfMonth, addDays, format, isSameDay, parseISO, isBefore } from 'date-fns';

interface Unshortening {
    id: number;
    time: string; //datetime
    shortened_link: string;
} // move to a separate interface file

@Component({
    selector: 'app-short-link-statistics-chart',
    templateUrl: './short-link-statistics-chart.component.html',
    styleUrls: ['./short-link-statistics-chart.component.scss']
})
export class ShortLinkStatisticsChartComponent implements OnInit {
    subscription$: Subscription;
    chartOptions: EChartsOption;


    constructor(private route: ActivatedRoute, private backendService: BackendService) { }

    ngOnInit(): void {
        this.subscription$ = this.route.paramMap.pipe(
            map((params: ParamMap) => String(params.get('id'))),
            switchMap(id => this.backendService.get<HttpResponse<Unshortening[]>>(`/api/url-short/unshortening/${id}/`)),
            map(response => response ? response.body : []),
            map((unshortenings: Unshortening[] | null) => unshortenings ? this.createEchartOptions(unshortenings): {})
        ).subscribe(val => this.chartOptions = val);
    }

    createEchartOptions(unshortenings: Unshortening[]): EChartsOption {
        let uSDates = unshortenings.map(us => parseISO(us.time));
        let date = new Date();
        let start = startOfMonth(date);
        let end = endOfMonth(date);
        let xAxisData = [];
        let yAxisData = []
        
        for (let i = start; isBefore(i, end); i = addDays(i, 1)) {
            console.log(isBefore(i, end), i)
            xAxisData.push(format(i, 'yyyy-MM-dd'));
            yAxisData.push(uSDates.filter(v => isSameDay(v, i)).length)
        }
        console.log(xAxisData, yAxisData)
        return {
            xAxis: {
                type: 'category',
                data: xAxisData,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: yAxisData,
                    type: 'line',
                },
            ],
        };
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}
