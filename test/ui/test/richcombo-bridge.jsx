import ButtonDropdown from '../../../src/components/buttons/button-dropdown.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;
var Simulate = TestUtils.Simulate;

describe('RichComboBridge', function() {
	beforeEach(function(done) {
		Utils.createAlloyEditor.call(this, done, {
			extraPlugins:
				AlloyEditor.Core.ATTRS.extraPlugins.value +
				',ae_richcombobridge,test_richcombobridge',
		});
	});

	afterEach(Utils.destroyAlloyEditor);

	it('creates a rich combo and invoke its initialization methods', function() {
		assert.property(
			AlloyEditor.Buttons,
			'ButtonRichCombo',
			'ButtonRichCombo should have been registered'
		);

		var initListener = sinon.stub();

		this.nativeEditor.once('richComboInit', initListener);

		var renderListener = sinon.stub();

		this.nativeEditor.once('richComboRender', renderListener);

		this.render(<AlloyEditor.Buttons.ButtonRichCombo />, this.container);

		assert.isTrue(initListener.calledOnce);
		assert.isTrue(renderListener.calledOnce);
	});

	it('renders just the menu button when not expanded', function() {
		var ref = React.createRef();
		this.render(
			<AlloyEditor.Buttons.ButtonRichCombo expanded={false} ref={ref} />,
			this.container
		);
		var buttonRichCombo = ref.current;
		assert.ok(buttonRichCombo);

		var menuButton = TestUtils.findRenderedDOMComponentWithTag(
			buttonRichCombo,
			'button'
		);

		var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(
			buttonRichCombo,
			'ae-dropdown'
		);

		assert.ok(menuButton);
		assert.equal(0, dropdown.length);
	});

	it('shows a dropdown with the action buttons when expanded', function() {
		var ref = React.createRef();
		this.render(
			<AlloyEditor.Buttons.ButtonRichCombo expanded={true} ref={ref} />,
			this.container
		);
		var buttonRichCombo = ref.current;
		assert.ok(buttonRichCombo);

		var dropdown = TestUtils.findAllInRenderedTree(
			buttonRichCombo,
			function(component) {
				return TestUtils.isCompositeComponentWithType(
					component,
					ButtonDropdown
				);
			}
		);

		assert.ok(dropdown);
		assert.equal(1, dropdown.length);

		var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(
			dropdown[0],
			'button'
		);

		assert.ok(actionButtons.length);
	});

	it('shows a dropdown with the action buttons when expanded', function() {
		var ref = React.createRef();
		this.render(
			<AlloyEditor.Buttons.ButtonRichCombo expanded={true} ref={ref} />,
			this.container
		);
		var buttonRichCombo = ref.current;
		assert.ok(buttonRichCombo);

		var dropdown = TestUtils.findAllInRenderedTree(
			buttonRichCombo,
			function(component) {
				return TestUtils.isCompositeComponentWithType(
					component,
					ButtonDropdown
				);
			}
		);

		assert.ok(dropdown);
		assert.equal(1, dropdown.length);

		var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(
			dropdown[0],
			'button'
		);

		assert.ok(actionButtons.length);
	});

	it('executes the onClick method with the item value when clicking on an item', function() {
		var clickListener = sinon.stub();

		this.nativeEditor.once('richComboClick', clickListener);

		var ref = React.createRef();
		this.render(
			<AlloyEditor.Buttons.ButtonRichCombo expanded={true} ref={ref} />,
			this.container
		);
		var buttonRichCombo = ref.current;
		assert.ok(buttonRichCombo);

		var dropdown = TestUtils.findAllInRenderedTree(
			buttonRichCombo,
			function(component) {
				return TestUtils.isCompositeComponentWithType(
					component,
					ButtonDropdown
				);
			}
		);

		assert.ok(dropdown);
		assert.equal(1, dropdown.length);

		var richComboItem = ReactDOM.findDOMNode(buttonRichCombo).querySelector(
			'[data-value=entry2]'
		);

		Simulate.click(richComboItem);

		assert.isTrue(clickListener.calledOnce);
		assert.isTrue(
			clickListener.firstCall.calledWith(sinon.match({data: 'entry2'}))
		);
	});
});
