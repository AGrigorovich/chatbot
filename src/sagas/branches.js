import { put, call, takeLatest } from 'redux-saga/effects';

import * as branchesActions from '../store/actions/branches';
import * as branchesTypes from '../store/types/branches';

import {
    getBranchesListRequest,
    createBranchRequest,
    editBranchRequest,
    deleteBranchRequest,
} from '../services/API/branches';

function* getBranchesAction() {
    try {
        const { data } = yield call(getBranchesListRequest);
        yield put(branchesActions.successGetBranchesList(data));
    } catch (err) {
        yield put(branchesActions.failGetBranchesList(err));
    }
}

function* createBranchAction({ payload }) {
    try {
        const { data } = yield call(createBranchRequest, payload);
        yield put(branchesActions.successCreateBranch(data));
    } catch (err) {
        yield put(branchesActions.failCreateBranch(err));
    }
}

function* editBranchAction({ payload }) {
    try {
        const { data } = yield call(editBranchRequest, payload);
        yield put(branchesActions.successEditBranch(data));
    } catch (err) {
        yield put(branchesActions.failEditBranch(err));
    }
}

function* deleteBranchAction({ payload }) {
    try {
        const { data } = yield call(deleteBranchRequest, payload);
        yield put(branchesActions.successDeleteBranch(data));
    } catch (err) {
        yield put(branchesActions.failDeleteBranch(err));
    }
}

// Watchers
export default function* watchBranchesAction() {
    yield takeLatest(branchesTypes.GET_BRANCHES_LIST_START, getBranchesAction);
    yield takeLatest(branchesTypes.CREATE_BRANCH_START, createBranchAction);
    yield takeLatest(branchesTypes.EDIT_BRANCH_START, editBranchAction);
    yield takeLatest(branchesTypes.DELETE_BRANCH_START, deleteBranchAction);
}
