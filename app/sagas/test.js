import request  from '../utils/request'
import { call, put, select } from 'redux-saga/effects'
const Api = {
    fetchProduct(id) {
        const url = `/api/posts/${id}`;
        return request(url, {
            method: 'GET'
        });
    },
};



export function* fetchProduct({payload: id}) {
    try {
        const {data} = yield call(Api.fetchProduct, id);

        console.log(data);
        yield put({type: "FETCH_PRODUCT_SUCCESS", product: data});
    } catch (e) {
        // yield put(failReceiveProduct(id, e.message));
    }
}
