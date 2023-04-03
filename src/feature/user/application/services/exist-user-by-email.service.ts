import { BaseUseCase } from '@/core/domain/base/base.use-case';
import { UserRepository } from '../../domain/user.repository';

export class ExistUserByEmail implements BaseUseCase<boolean> {
	constructor(private readonly userRepository: UserRepository) {}

	async run(email: string): Promise<boolean> {
		const user = await this.userRepository.findOne({ email });

		if (user != null) return false;

		return true;
	}
}
