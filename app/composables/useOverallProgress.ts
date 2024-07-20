import type {UploadQueueItem} from "~/components/UploadQueue.vue";
import type {Ref} from "vue";


export default function useOverallProgress(uploadQueue: Ref<UploadQueueItem[]>): Ref<number> {
    return computed<number>(() => {
        const uploadQueueLength = uploadQueue.value.length;
        const totalFiles = uploadQueue.value.filter(item => item.status !== 'queued').length;

        if (uploadQueueLength === 0 || totalFiles === 0) {
            return 0;
        }

        const inProgressProgress = uploadQueue.value.reduce((acc, item) => {
            return acc + (item.progress || 0);
        }, 0);

        const completedFiles = totalFiles - uploadQueueLength;
        const completedProgress = completedFiles * 100;
        const totalProgress = completedProgress + inProgressProgress;
        const totalMaxProgress = totalFiles * 100;

        return Math.round((totalProgress / totalMaxProgress) * 100);
    })
}