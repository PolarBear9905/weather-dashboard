import './Searchbar.css';

const Searchbar = ({ location, setLocation, searchLocation }) => {
  return (
    <div className='center'>
        <div className='search'>
            <input
                id='location-search'
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    searchLocation();
                  }
                }}
                placeholder='Search for location'
                type='text' 
            />
            <button type="button" onClick={searchLocation}>
              <div className='search-icon'></div>
            </button>
        </div>
    </div>
  );
};

export default Searchbar;
