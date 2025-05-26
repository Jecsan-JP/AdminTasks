import { useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { swalDataManager } from '@/common/presentation/di/di_frameworks';
import { CommentsDataRepository } from '../../domain/repositories/CommentsRepository';
import { http } from '@/common/singletons/http';
import { useTasksContext } from '../context/TasksProvider';

const commentsRepository = new CommentsDataRepository(http);

export function useCommentDelete() {
  const [loading, setLoading] = useState(false);
  const { refreshTasks } = useTasksContext();

  const handleDeleteComment = async (commentId: string): Promise<void> => {
    setLoading(true);
    try {
      await swalDataManager().deleteItem('Comentario', async () => {
        await firstValueFrom(commentsRepository.deleteComment(commentId));
        swalDataManager().showSuccesMessage(
          '¡Comentario eliminado!',
          'El comentario se ha eliminado exitosamente.'
        );
        refreshTasks();
      });
    } catch (err: any) {
      swalDataManager().showErrorMessage('Ocurrió un error al eliminar el comentario', err);
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteComment, loading };
} 