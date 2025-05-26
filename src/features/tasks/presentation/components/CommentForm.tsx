// src/features/tasks/presentation/components/CommentForm.tsx
import React, { useState, useEffect } from 'react';

interface CommentFormProps {
  onSubmit: (comment: { content: string }) => void;
  initialValues?: { content?: string };  // <-- Añadimos initialValues
  loading?: boolean;
  error?: string | null;
  success?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  initialValues,
  loading = false,
  error,
  success,
}) => {
  const [content, setContent] = useState(initialValues?.content || '');  // <-- Inicializamos con initialValues

  // Opcional: Resetear el formulario si success es true
  useEffect(() => {
    if (success) {
      setContent('');
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ content });
    if (!initialValues) {  // Solo limpiamos si no es edición
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Comentario</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          rows={3}
          required
        />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      {success && (
        <div className="text-sm text-green-600">
          {initialValues ? '¡Comentario actualizado exitosamente!' : '¡Comentario agregado exitosamente!'}
        </div>
      )}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (initialValues ? 'Actualizando...' : 'Agregando...') : (initialValues ? 'Actualizar' : 'Agregar')}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;