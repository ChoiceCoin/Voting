import * as Yup from 'yup';
import moment from 'moment';

const BVNRegExp = /^[0-9]{11}$/;
const numWithIntlCodeRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  fName: Yup.string()
    .min(2, 'First name Too Short!')
    .max(50, 'First name Too Long!')
    .required('First name is required'),
  lName: Yup.string()
    .min(2, 'Last name is Too Short!')
    .max(50, 'Last name is Too Long!')
    .required('Last name is required'),
  password: Yup.string().min(6).required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  description: Yup.string().required('Description is required').nullable(),
  mobile: Yup.string()
    .matches(numWithIntlCodeRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  accept: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6).required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
});

export const SearchJobSchema = Yup.object().shape({
  location: Yup.string(),
  job_title: Yup.string(),
});

export const FilterJobSchema = Yup.object().shape({
  industry: Yup.string(),
  level: Yup.string(),
});

export const AddEducationSchema = Yup.object().shape({
  institutionName: Yup.string().required('Intitution name is required').nullable(),
  degree: Yup.string().required('Degree is required').nullable(),
  institutionCat: Yup.string().required('Institution category is required').nullable(),
  classOfDegree: Yup.string().notRequired().required('Class of Degree is required').nullable(),
  fieldOfStudy: Yup.string().min(2, 'Field of study Too Short!').required('Field of study is required'),
  startDate: Yup.date().required('Start date is required').nullable(),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after start date')
    .nullable()
    .required('End date is required'),
});

export const AddInterestSchema = Yup.object().shape({
  title: Yup.string().required('Interest title is required').nullable(),
  genre: Yup.string().required('Interest genre is required').nullable(),
  additionalInfo: Yup.string().notRequired(),
});

export const AddCertificationSchema = Yup.object().shape({
  instituteName: Yup.string().required('Name of institute is required').nullable(),
  certificationTitle: Yup.string().required('Certification title is required'),
  dateAwarded: Yup.date().required('Date awarded is required').nullable(),
});

export const AddWorkSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Job title is required').nullable(),
  company: Yup.string().min(2, 'Company name Too Short!').required('Company is required').nullable(),
  jobDsc: Yup.string().required('Job description is required'),
  empType: Yup.string().required('Employment type is required').nullable(),
  industry: Yup.string().required('Please select industry').nullable(),
  level: Yup.string().required('Please select level').nullable(),
  location: Yup.string().notRequired().nullable(),
  startDate: Yup.date().required('Start date is required').nullable(),
  endDate: Yup.date().min(Yup.ref('startDate'), 'End date must be after start date').nullable().notRequired(),
});

export const ReferenceSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  fName: Yup.string()
    .min(2, 'First name Too Short!')
    .max(50, 'First name Too Long!')
    .required('First name is required'),
  lName: Yup.string()
    .min(2, 'Last name is Too Short!')
    .max(50, 'Last name is Too Long!')
    .required('Last name is required'),
  organization: Yup.string()
    .required('Organization is required'),
  position: Yup.string()
    .required('Position is required'),
  jobTitle: Yup.string()
    .required('Job Title is required'),
  jobDescription: Yup.string()
    .required('Description is required'),
  startDate: Yup.date().required('Start date is required').nullable(),
  endDate: Yup.date().min(Yup.ref('startDate'), 'End date must be after start date').nullable().notRequired(),
  characterRating: Yup.string()
    .required('Description is required'),
  performanceRating: Yup.string()
    .required('Description is required'),
  additionalRemark: Yup.string(),
});

export const AddReferenceSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Referee Email is required'),
});

export const createJobSchema = Yup.object().shape({
  job_title: Yup.string().required('* Job Title is required'),
  company_name: Yup.string().required('* Company name is required'),
  job_industry: Yup.string().required('* Industry is required'),
  location: Yup.string().required('* Location required'),
  offer_type: Yup.string().required('* Please select an employement type'),
  application_email: Yup.string().email('* Please supply a valid email address').required('* Application email is required'),
  job_description: Yup.string().required('* Job description is required'),
  deadline: Yup.string()
    .required('Please set job expiration date')
    .test('deadline', 'Date must be in the future', (value) => moment().diff(moment(value), 'days') < 0),
  years_of_experience_required: Yup.string().required('* Years of experience is required'),
  level: Yup.string().required('* Career Level is required'),
  // gender: Yup.string().required('Title is required'),
  salary: Yup.string().required('*required'),
  candidateCount: Yup.string().required('* Please set the number of candidates'),
});

export const UpdateBiodataSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  fName: Yup.string()
    .min(2, 'First name Too Short!')
    .max(50, 'First name Too Long!')
    .required('First name is required'),
  lName: Yup.string()
    .min(2, 'Last name is Too Short!')
    .max(50, 'Last name is Too Long!')
    .required('Last name is required'),
  about: Yup.string().min(5, 'About you is too short').required('Please tell us about you'),
  mobile: Yup.string()
    .matches(numWithIntlCodeRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  bvn: Yup.string().matches(BVNRegExp, 'BVN number is not valid must be 11 digits').nullable().notRequired(),
  address: Yup.string().min(2, 'Address is too short').required('Please include your address'),
  headline: Yup.string().min(2, 'Profile headline is too short').required('Please include your profile headline'),
  dob: Yup.string()
    .test('dob', 'You must be above 10 years old', (value) => moment().diff(moment(value), 'years') >= 10)
    .nullable(),
});

export const AddIdentificationSchema = Yup.object().shape({
  cardType: Yup.string().required('Card type is required').nullable(),
  cardNumber: Yup.string().required('Card type is required').nullable(),
  expiringDate: Yup.string().when('cardType', {
    is: (cardType) => cardType !== 'voters',
    then: Yup.string()
      .required('Card Number is required')
      .test('expiringDate', 'Date must be in the future', (value) => moment().diff(moment(value), 'days') < 0),
  }),
});

export const CreditCardSchema = Yup.object().shape({
  cardName: Yup.string().required('Card name is required').nullable(),
  cardNumber: Yup.string().required('Card number is required').nullable(),
  cvv: Yup.string().required('Card cvv is required').nullable(),
  expiringDate: Yup.string()
    .test('expiringDate', 'Date must be in the future', (value) => moment().diff(moment(value), 'days') < 0)
    .required('Expiring date is required'),
});
