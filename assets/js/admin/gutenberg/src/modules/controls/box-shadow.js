/**
 * Class InputControl
 */

import { BaseControl } from  './base-control';

const {
	ColorPalette,
	SelectControl,
	RangeControl,
} = wp.components;

const { __ } = wp.i18n;

const {
	select
} = wp.data;

class BoxShadow extends BaseControl {

	constructor( args ) {
		super( args );
	}

	setDefaultArgs() {
		let settings = select('core/block-editor').getSettings();

		this.args = {
			class_name: 'jet-st-box-shadow-control',
			label: '',
			separator: 'none',
			hide_label_from_vision: false,
			help: '',
			position: ';',
			horizontal: 0,
			vertical: 0,
			blur: 0,
			spread: 0,
			opacity: 0.5,
			colors: settings.colors,
			clearable: true,
		};

		this.defaultValue = {
			position: ';',
			horizontal: 0,
			vertical: 0,
			blur: 0,
			spread: 0,
			opacity: 0.5,
			color: "0, 0, 0",
		};
	}

	setDefaultAttribut(){
		this.attributes = {
			default: {
				value: {
					position: ';',
					horizontal: 0,
					vertical: 0,
					blur: 0,
					spread: 0,
					opacity: 0.5,
					color: "0, 0, 0",
				}
			},
			type: 'object',
		}
	}

	renderControl(){
		let {
			colors,
			clearable,
		} = this.args;

		let value = Object.assign( {}, this.defaultValue, this.getValue() );

		function hexToRgb( hex ) {
			if ( null === hex || undefined === hex || "" === hex ) {
				return "";
			}

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

			return result ?
				parseInt( result[1], 16 ) + ', ' + parseInt( result[2], 16 ) + ', ' + parseInt( result[3], 16 ) : null;
		}

		function colorToHex( color ) {
			var hexadecimal = color.toString( 16 );

			return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
		}

		function rgbToHex( rgb ) {
			var hex = Number( rgb ).toString( 16 );

			if ( hex.length < 2 ) {
				hex = "0" + hex;
			}

			return hex;
		};

		function ConvertRGBtoHex( rgb ) {
			if ( undefined === rgb || null === rgb || "" === rgb ) {
				return "";
			}

			var colorRgb = rgb.replace(/ /g,'').split( "," ),
				red      = rgbToHex( colorRgb[0] ),
				green    = rgbToHex( colorRgb[1] ),
				blue     = rgbToHex( colorRgb[2] );

			return "#" + colorToHex( red ) + colorToHex( green ) + colorToHex( blue );
		}

		return (
			<div className={ 'jet-st-box-shadow-options' } >
				<p className='component-box-control__label'>{ __( 'Box Shadow Color. Use HEX Color Format', 'jet-styles-manager' ) }</p>
				<ColorPalette
					value={ ConvertRGBtoHex( value.color ) }
					colors={ colors }
					help={ __( 'Use HEX Color Format', 'jet-styles-manager' ) }
					clearable={ clearable }
					onChange={ ( newValue ) => {
						value.color = hexToRgb( newValue );
						this.setValue( value );
					} }
				/>

				<RangeControl
					label="Color opacity"
					value={ value.opacity }
					onChange={ ( newValue ) => {
						value.opacity = newValue;
						this.setValue( value );
					} }
					min={ 0.1 }
					max={ 1 }
					step={ 0.1}
				/>

				<RangeControl
					label="Horizontal"
					value={ value.horizontal }
					onChange={ ( newValue ) => {
						value.horizontal = newValue;
						this.setValue( value );
					} }
					min={ -100 }
					max={ 100 }
				/>

				<RangeControl
					label="Vertical"
					value={ value.vertical }
					onChange={ ( newValue ) => {
						value.vertical = newValue;
						this.setValue( value );
					} }
					min={ -100 }
					max={ 100 }
				/>

				<RangeControl
					label="Blur"
					value={ value.blur }
					onChange={ ( newValue ) => {
						value.blur = newValue;
						this.setValue( value );
					} }
					min={ -100 }
					max={ 100 }
				/>

				<RangeControl
					label="Spread"
					value={ value.spread }
					onChange={ ( newValue ) => {
						value.spread = newValue;
						this.setValue( value );
					} }
					min={ -100 }
					max={ 100 }
				/>

				<SelectControl
					value = { value.position }
					onChange = { ( newValue ) => {
						value.position = newValue;
						this.setValue( value );
					} }
					options = { [
						{
							value: ';',
							label: __( 'Outline' ),
						},
						{
							value: 'inset',
							label: __( 'Inset' ),
						}
					] }
					label = { __( 'Position', 'jet-styles-manager' ) }
					labelPosition = { 'side' }
				/>


				{/* { ! disable_style &&
					<div key={ 'border-type' } className={'jet-st-border-type'}>
						<SelectControl
							value = { value.style }
							onChange = { ( newValue ) => {
								this.setValue( { style: newValue } );
							} }
							options = { style }
							label = { __( 'Border Type', 'jet-styles-manager' ) }
							labelPosition = { 'side' }
						/>
					</div>
				}
				{ 'none' !== value.style && ! disable_width &&
					<div key={ 'border-width' } className={'jet-st-border-width'}>
						<BoxControl
							values = { value.width }
							units = { width_unit }
							onChange ={ ( newValue ) => {
								this.setValue( { width: newValue } );
							} }
							labelPosition = 'side'
							type  = 'number'
							label = { __( 'Border Width', 'jet-styles-manager' ) }
						/>
					</div>
				}
				{ 'none' !== value.style && ! disable_radius &&
					<div key={ 'border-radius' } className={'jet-st-border-radius'}>
						<BoxControl
							values = { value.radius }
							units = { radius_unit }
							onChange = { ( newValue ) => {
								this.setValue( { radius: newValue } );
							} }
							labelPosition = 'side'
							label = { __( 'Border Radius', 'jet-styles-manager' ) }
						/>
					</div>
				}
				{ 'none' !== value.style && ! disable_color &&
					<div key={ 'border-color' } className={'jet-st-border-color'}>
						<p className='component-box-control__label'>{ __( 'Border Color', 'jet-styles-manager' ) }</p>
						<ColorPalette
							value={ value.color }
							colors={ colors }
							disableCustomColors={ disable_custom_colors }
							clearable={ clearable }
							onChange={ ( newValue ) => {
								this.setValue( { color: newValue } );
							} }
						/>
					</div>
				} */}
			</div>
		);
	}
}

export { BoxShadow };
