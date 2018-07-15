import React from 'react'
import NqueenContainer from '../containers/NqueenContainer'
import Counter from '../components/Counter'
import Blinker from '../components/Blinker'
import Spinner from '../components/Spinner'
import Slider from '../components/Slider'

const App = () => (
	<div style={{
			display: 'inline-flex',
			flexFlow: 'column nowrap',
			justifyContent: 'center',
			boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.7)',
			borderRadius: '5px',
			padding: '4px',
			backgroundColor: 'white'
		}}>
		<NqueenContainer />
		<div style={{
				display: 'flex',
				flexFlow: 'row nowrap'
			}}>
			<Counter />
			<Blinker />
			<Spinner />
		</div>
		<div style={{
				display: 'flex',
				flexFlow: 'row nowrap'
			}}>
			<Slider />
		</div>
	</div>
)

export default App