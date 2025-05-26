import { useState } from 'react';
import { firstValueFrom } from 'rxjs';
import { swalDataManager } from '@/common/presentation/di/di_frameworks';
import { CommentsDataRepository } from '../../domain/repositories/CommentsRepository';
import { http } from '@/common/singletons/http';

const commentsRepository = new CommentsDataRepository(http);

export function useCommentFormCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateComment = async (
    taskId: string,
    content: string
  ): Promise<any | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await firstValueFrom(
        commentsRepository.createComment(taskId, content)
      );
      setSuccess(true);
      swalDataManager().showSuccesMessage(
        '¡Comentario agregado!',
        'El comentario se ha agregado exitosamente.'
      );
      return response;
    } catch (err: any) {
      setError('No se pudo agregar el comentario. Intenta de nuevo.');
      swalDataManager().showErrorMessage('Ocurrió un error al agregar el comentario', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateComment, loading, error, success };
} 