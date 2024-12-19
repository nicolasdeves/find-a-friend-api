import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository';
import { RegisterOrgUseCase } from '@/use-cases/register-org';
import exp from 'constants';

import { expect, describe, it, beforeEach } from 'vitest';
import { object } from 'zod';

let orgRepository: InMemoryOrgRepository;
let registerOrg: RegisterOrgUseCase;

describe('Org use case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    registerOrg = new RegisterOrgUseCase(orgRepository);
  });

  it('should be able to register a org', async () => {
    
      const { org } = await registerOrg.handle({
        name: 'Org 01',
        email: 'org@gmail.com',
        phone: '9595959595',
        city_id: 1,
        user_id: 1
      })
      expect(org).toEqual(
        expect.objectContaining({ name: 'Org 01' })
      )
  });
});
