import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './entities/auth.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh.token.schema';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {
      constructor(@InjectModel(user.name) private model:Model<user>,
        @InjectModel(RefreshToken.name) private RefreshModel: Model<RefreshToken>
      ,
      private jwtService:JwtService){}

      async signup(sigupData:CreateAuthDto){
        const {name,email,password}=sigupData
        const EmailInUse=await this.model.findOne({
          email
        })
        if(EmailInUse){
          throw new BadRequestException('User is Already Present')
        }
        const hashPassword=await bcrypt.hash(password,10);
        await this.model.create({
          name,
          email,
          password:hashPassword
        })

      }
      async login(data:LoginDto){
        const {email,password}=data
        const user = await this.model.findOne({
          email
        })
        if(!user){
          return new UnauthorizedException('You Dont have an account');
        }
        const passwordCheck=await bcrypt.compare(password,user.password);
        if(!passwordCheck){
          return new UnauthorizedException('Wrong Password');
        }
        const token=this.generateToken(user._id);
        return token;

      }
      async generateToken(userId){
        const token=await this.jwtService.sign({userId},{expiresIn:'1h'})
        const refreshToken=await uuidv4();
        this.storageRefreshToken(refreshToken,userId);
        return {token,refreshToken};
      }
      async storageRefreshToken(token:string ,userId){
        const expiryDate=new Date();
        expiryDate.setDate(expiryDate.getDate()+3);
          await this.RefreshModel.create({
            token,
            userId,
            expiryDate:expiryDate
          });
      }
}
