import { render } from 'micromustache';

export function renderTemplate(template: string, data: Record<string, any>): string {
	return render(template, data);
}
