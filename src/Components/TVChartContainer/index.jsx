import * as React from 'react';
import './index.css';
import { widget } from '../../charting_library/charting_library';
import Datafeed from './datafeed';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {

	

	state = {
		current_price_usd: 0
	}
	static defaultProps = {
		symbol: "Astronomia Token BSC/ASTRON",
		//symbol: "0xac51066d7bec65dc4589368da368b212745d63e8",
		interval: '1h',
		containerId: 'tv_chart_container',
		datafeedUrl: Datafeed,
		libraryPath: '../../charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		pricescale: 1000000000000000,
	};

	tvWidget = null;

	componentDidUpdate(prevProps, prevState, snapshot) {
	//	console.log('updated symbol', this.props.symbol)
		this.graph()
	}
	componentDidMount() {

	

		this.getData()
	//	console.log('Default symbol', this.props.symbol)
		this.graph()
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	getData = () => {
		// this.setState({ data: [{"current_price_usd":"0.000000000000969","holders":1332,"balance_usd":3898,"balance_wbnb":"12.94","market_cap":44601,"circulating_supply":46027528650000000,"total_supply":100000000000000000}] });

		this.intervalID = setTimeout(this.getData.bind(this), 2000);


		fetch('https://api.astronomia.finance/basic/data.json')
			.then(response => response.json())
			.then(data => {

				this.setState({
					current_price_usd: (data[0]['current_price_usd']).toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 })
				});
			});
	}

	graph() {

		const widgetOptions = {
			symbol: this.props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			//debug: true,
			datafeed: this.props.datafeedUrl,
			//datafeed: new window.Datafeeds.UDFCompatibleDatafeed(Datafeed),
			//datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			theme: 'Dark',
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			pricescale: 1000000000000000,
			studies_overrides: this.props.studiesOverrides,
			zoom: 0.5,
			loading_screen: { backgroundColor: '#1e242c' },
			overrides: {
				//'volumePaneSize': "tiny",
				'paneProperties.backgroundType': 'solid',
				//'paneProperties.backgroundGradientStartColor': "#232a32",
				//'paneProperties.backgroundGradientEndColor': "#455161",
				'paneProperties.background': '#1e242c',
				'paneProperties.vertGridProperties.color': '#232a32',
				'paneProperties.horzGridProperties.color': '#232a32',
				//'paneProperties.horzGridProperties.style': 1,
				//'scalesProperties.textColor': '#7B7F84',
				//'paneProperties.crossHairProperties.color': "#989898",
				//'paneProperties.crossHairProperties.width': 1,
				//'paneProperties.topMargin': 10,
				//'paneProperties.bottomMargin': 8,
				//'volumePaneSize': "tiny",
				//'scalesProperties.backgroundColor': "#ffffff",
				'scalesProperties.fontSize': 10,
				//'scalesProperties.lineColor': "#555",
				//'scalesProperties.textColor': "#555",
				//'scalesProperties.scaleSeriesOnly': true,
				//'scalesProperties.showSeriesLastValue': true,
				//'scalesProperties.showSeriesPrevCloseValue': true,
				//'scalesProperties.showStudyLastValue': false,
				//'scalesProperties.showStudyPlotLabels': false,
				//'scalesProperties.showSymbolLabels': false,
				//'scalesProperties.showCurrency': false,
				//'scalesProperties.showUnit': false,
				//'timeScale.rightOffset': 5,
				//'mainSeriesProperties.style': 1,
				//'mainSeriesProperties.showCountdown': true,
			    //'mainSeriesProperties.visible': true,
				//'mainSeriesProperties.showPriceLine': true,
				//'mainSeriesProperties.priceLineWidth': 1,
				//'mainSeriesProperties.priceLineColor': '',
				//'mainSeriesProperties.showPrevClosePriceLine': false,
				//'mainSeriesProperties.prevClosePriceLineWidth': 1,
				//'mainSeriesProperties.prevClosePriceLineColor': 'rgba( 85, 85, 85, 1)',
				//'mainSeriesProperties.lockScale': true,
				//'mainSeriesProperties.minTick': 'pricescale',
				//'mainSeriesProperties.priceAxisProperties.autoScale':true,       
				//'mainSeriesProperties.priceAxisProperties.autoScaleDisabled':true,
				//'mainSeriesProperties.priceAxisProperties.percentage':false,
				//'mainSeriesProperties.priceAxisProperties.percentageDisabled':true,
				//'mainSeriesProperties.priceAxisProperties.log':false,
				//'mainSeriesProperties.priceAxisProperties.logDisabled':true,
				//'mainSeriesProperties.candleStyle.drawWick': false,
				//'paneProperties.legendProperties.showStudyArguments': false
 

			},
			custom_css_url: '/themed.css'
		};



		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		let height
		
		if(this.props.height !== undefined) { 

			height = this.props.height
		} 

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				document.getElementById('tv_chart_container').setAttribute("style", "height:" + height + "px !important" || "510px");
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}

	render() {
		return (
			<div>

				<div className="justify-content-between mb-2 d-flex">

					<div className="dashboard--token text-left">
						<div className="d-flex justify-content-between">Hexachain Token BSC (HEXA/BNB)</div>
						<div className="d-flex justify-content-between"><p className="up">${this.state.current_price_usd}</p></div>
					</div>

					<div className="dashboard--balances text-right d-none d-lg-flex flex-column">
						<div className="d-flex justify-content-between">Balance: 0.000000000000</div>
						<div className="d-flex justify-content-end "><p className="up">$0.000000000000</p></div>

					</div>

				</div>

				<div
					id={this.props.containerId}
					className={'TVChartContainer'}
				/>
			</div>

		);
	}
}
