import cuid from 'cuid';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
/**
 * Génère une saga Redux interruptible.
 *
 * @param {Function} saga Saga originale dont on génère une version interruptible.
 * @param {String} cancelActionType Type de l'action Redux permettant l'interuption.
 */
export const asyncCancellableSaga = (saga, cancelActionType) =>
  function* (...args) {
    // Génére un id via un alogorithme résistant au collisions
    // pour distinguer les actions qui permettront d'interrompre
    // cette tâche dans le cas où il n'y aurait pas d'annulation.
    const taskId = yield call(cuid);
    const endAction = {
      type: `END_TASK_${taskId}`,
    };
    // Exécute la saga originale et sauvegarde la tâche correspondante.
    const task = yield fork(function* () {
      yield call(saga, ...args);
      yield put(endAction);
    });
    // Attend la fin du traitement OU son annulation.
    // La surveillance de l'action de fin est nécessaire pour éviter
    // de laisser ce traitement inutillement suspendu, en attente
    // d'une demande d'annulation obsolète.
    const action = yield take([endAction.type, cancelActionType]);
    if (action.type == cancelActionType) {
      yield cancel(task);
    }
  };
