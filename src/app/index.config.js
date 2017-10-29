export function config ($logProvider, toastrConfig, ChartJsProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  ChartJsProvider.setOptions({
    chartColors: [
      '#4b69bf',
      '#58f9d3',
      '#dc4503'
    ]
  });
}
