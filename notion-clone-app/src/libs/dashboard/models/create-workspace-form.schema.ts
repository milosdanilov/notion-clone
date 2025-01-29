import { z } from 'zod';

export const CreateWorkspaceFormSchema = z.object({
  workspaceName: z
    .string()
    .describe('Workspace Name')
    .min(1, 'Workspace name must be of min 1 character'),
  logo: z.any(),
});
