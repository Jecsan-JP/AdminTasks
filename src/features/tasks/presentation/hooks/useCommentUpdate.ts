import { useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { swalDataManager } from '@/common/presentation/di/di_frameworks';
import { CommentsDataRepository } from '../../domain/repositories/CommentsRepository';
import { http } from '@/common/singletons/http';
import { useTasksContext } from '../context/TasksProvider';

const commentsRepository = new CommentsDataRepository(http);

export function useCommentUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { refreshTasks } = useTasksContext();

  const handleUpdateComment = async (
    commentId: string,
    content: string
  ): Promise<any | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Suponiendo que tu endpoint es /comments/:commentId y acepta PUT
      const response = await firstValueFrom(
        commentsRepository.updateComment(commentId, content)
      );
      setSuccess(true);
      swalDataManager().showSuccesMessage(
        '¡Comentario actualizado!',
        'El comentario se ha actualizado exitosamente.'
      );
      refreshTasks();
      return response;
    } catch (err: any) {
      setError('No se pudo actualizar el comentario. Intenta de nuevo.');
      swalDataManager().showErrorMessage('Ocurrió un error al actualizar el comentario', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateComment, loading, error, success };
} 