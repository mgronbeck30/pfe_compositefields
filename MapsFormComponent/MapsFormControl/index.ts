import {IInputs, IOutputs} from "./generated/ManifestTypes";
import {get} from 'scriptjs';

export class MapsFormControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _notifyOutputChanged: () => void;
	private labelElement: HTMLLabelElement;
	private geocoder: google.maps.Geocoder;
	private map: google.maps.Map;
	private inputElement: HTMLInputElement;
	private _container: HTMLDivElement;
	private _googleScript: HTMLScriptElement;
	private _body: HTMLBodyElement; 
	private _context: ComponentFramework.Context<IInputs>;
	private _refreshData: EventListenerOrEventListenerObject;
	private _address: string;

	constructor()
	{
		
	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._context = context;
		this._container = document.createElement("div");
		this._container.setAttribute("id","map");
		this._container.setAttribute("class","maps");
		this._container.setAttribute("style","position: inherit");
		container.appendChild(this._container);
		get("https://maps.googleapis.com/maps/api/js?key=AIzaSyB1y7FlYsk3chm5j3DMZYB9Yt7ijByYkQQ", ()=>{
			//this._address = "new york city";
			var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: {lat: -34.397, lng: 150.644}
			});
		this.geocoder = new google.maps.Geocoder();
		this._address = context.parameters.addressLine1.raw +" " +context.parameters.city.raw + ", " +context.parameters.state.raw + " " +context.parameters.zip.raw;
		this.codeAddress(this.geocoder, map);
		});
	}
	
	public initMap(){
		var init = () => {
			var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: {lat: -34.397, lng: 150.644}
			});
		this.geocoder = new google.maps.Geocoder();
		this.codeAddress(this.geocoder, map);
		}
	}
	public codeAddress(geocoder: google.maps.Geocoder, map: google.maps.Map) {
		geocoder.geocode({'address': this._address}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
			map: map,
			position: results[0].geometry.location
			});
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
		});
	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		//var map = new google.maps.Map(document.getElementById('map'), {
		//zoom: 8,
		//center: {lat: -34.397, lng: 150.644}
		//});
		//this.geocoder = new google.maps.Geocoder();
		//this._address = context.parameters.addressLine1.raw + " " + context.parameters.addressLine2 + " " +context.parameters.city + ", " +context.parameters.state + " " +context.parameters.zip;
		//this.codeAddress(this.geocoder, map);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
