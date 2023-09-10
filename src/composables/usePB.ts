import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB_URL)

const usePB = () => {
    return pb
}

export default usePB