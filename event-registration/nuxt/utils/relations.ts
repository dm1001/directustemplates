export function safeRelation(
	idOrObject: string | { [key: string]: any } | null | undefined,
): { id: string; [key: string]: any } | null | undefined {
	if (!idOrObject) return undefined;

	if (typeof idOrObject === 'string') {
		return {
			id: idOrObject,
		};
	}

	if (idOrObject.id) {
		return idOrObject.id;
	}

	return null;
}

export function safeRelationId(
    input: string | { [key: string]: any } | null | undefined,
    key: string = 'id'
  ): string | null | undefined {
    if (!input) {
      return undefined;
    }

    if (typeof input === 'string') {
      return input;
    }

    if (typeof input === 'object' && input !== null && input.hasOwnProperty(key)) {
      const value = input[key];
      return typeof value === 'string' ? value : null;
    }

    return null;
  }
