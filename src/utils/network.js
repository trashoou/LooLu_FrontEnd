
export const getApiResource = async (picture) => {
    try {
        const res = await fetch(picture);

        if (!res.ok) {
            console.error('Could not fetch.', res.status);
            return false;
        }


        return await res.json();
    } catch (error) {
        console.error('Could not fetch.', error.message);
        return false;
    }
}

// getApiResource(SWAPI_ROOT+SWAPI_PEOPLE)
//     .then(body => console.log(body))

// (async () => {
//     const body = await getApiResource(SWAPI_ROOT+SWAPI_PEOPLE);
//     console.log(body);
// })();
